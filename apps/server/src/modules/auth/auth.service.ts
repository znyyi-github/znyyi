import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import type { LoginQuery, RegisterQuery } from '@znyyi/shared';
import { ResponseDataImpl } from 'src/common/response-data';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    private jwtService: JwtService,
  ) {}

  // 登录
  async login(query: LoginQuery) {
    const data = await this.UserService.findUserAndPwd(query);

    if (!data) {
      const res = new ResponseDataImpl(null, '1', 'app.text.none_user');
      return res;
    }
    const { user, photo } = data;
    const access_token = await this.jwtService.signAsync({ user, photo });
    const res = new ResponseDataImpl(
      { access_token },
      '0',
      'app.text.user_login_success',
    );
    return res;
  }

  // 注册
  async register(query: RegisterQuery) {
    const res = await this.UserService.createOne(query);
    return res;
  }

  // 检测是否登录
  check() {
    const res = new ResponseDataImpl(null, '0', 'app.text.logout.sucess');
    return res;
  }

  // 登出
  logout() {
    const res = new ResponseDataImpl(null, '0', 'app.text.logout.sucess');
    return res;
  }
}
