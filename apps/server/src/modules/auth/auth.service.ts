import { AccountService } from '../account/account.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import crypto from 'node:crypto';
import type { LoginQuery, RegisterQuery } from '@znyyi/shared';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './auth-data';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenEntity } from './refresh-token.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  // 登录
  async login(payload: AuthPayload) {
    const access_token = await this.generateAccessToken(payload);
    const refresh_token = await this.generateRefreshToken(payload);
    const userProfile = await this.accountService.getUserProfile(payload.user);
    return { access_token, refresh_token, userProfile };
  }

  async validateUser(query: LoginQuery) {
    const data = await this.accountService.findUserAndPwd(query);
    if (!data) {
      return null;
    }
    return { user: data.user };
  }

  async generateAccessToken(payload: AuthPayload) {
    const { user } = payload;
    return this.jwtService.signAsync<AuthPayload>({ user });
  }

  async generateRefreshToken(payload: AuthPayload) {
    const refresh_token = crypto.randomBytes(32).toString('hex');
    const exp = Date.now() / 1000 + 7 * 24 * 60 * 60;
    await this.refreshTokenRepository.save({
      refresh_token,
      user: payload.user,
      exp,
    });
    return refresh_token;
  }

  // 注册
  async register(query: RegisterQuery) {
    const res = await this.accountService.createOne(query);
    return res;
  }

  // 登出
  async logout(payload: AuthPayload) {
    const { refreshToken } = payload;
    await this.refreshTokenRepository.delete({ refresh_token: refreshToken });
  }

  // 刷新access-token
  async refreshAccessToken(payload: AuthPayload, refreshToken: string) {
    const rtData = await this.refreshTokenRepository.findOne({
      where: {
        refresh_token: refreshToken,
        user: payload.user,
      },
    });
    if (!rtData) {
      throw new UnauthorizedException(); //无rt 返回 401
    }
    if (this.checkExpireTime(rtData.exp)) {
      await this.refreshTokenRepository.delete(rtData._id);
      throw new UnauthorizedException(); //rt过期 返回 401
    }
    const accessToken = await this.generateAccessToken(payload); // rt有效 刷新
    return accessToken;
  }

  // 检测exp是否过期（true:过期 false:未过期）
  checkExpireTime(exp: number) {
    const currentTime = Math.floor(Date.now() / 1000);
    return exp < currentTime;
  }
}
