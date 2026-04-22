import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AuthPayload,
  CONFIG_JWT_SECRET,
  COOKIE_REFRESH_TOKEN,
} from './auth-data';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private config: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: config.get<string>(CONFIG_JWT_SECRET)!,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: AuthPayload) {
    const { exp } = payload;
    const refreshToken = req.cookies[COOKIE_REFRESH_TOKEN] as string;

    // at过期，重新生成at
    if (this.authService.checkExpireTime(exp!)) {
      const accessToken = await this.authService.refreshAccessToken(
        payload,
        refreshToken,
      );
      payload.accessToken = accessToken;
    }
    payload.refreshToken = refreshToken;
    return payload;
  }
}
