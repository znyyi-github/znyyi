import { Controller, Post, Body, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { LoginResponse, RegisterQuery } from '@znyyi/shared';
import { ResponseDataImpl } from 'src/common/response-data';
import { LoginAuthGuard } from './login.guard';
import type { Request } from 'express';
import { AuthPayload, AuthPublic } from './auth-data';
import type { Response } from 'express';
import {
  COOKIE_REFRESH_TOKEN,
  HEADER_X_ACCESS_TOKEN,
  REFRESH_TOKEN_EXPIRE,
} from '../auth/auth-data';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AuthPublic()
  @UseGuards(LoginAuthGuard)
  @Post('login')
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseDataImpl<LoginResponse>> {
    const { access_token, refresh_token, userProfile } =
      await this.authService.login(req.user as AuthPayload);

    writeTokens(res, access_token, refresh_token);
    return ResponseDataImpl.buildSuccess(userProfile);
  }

  @Post('register')
  register(@Body() query: RegisterQuery) {
    return this.authService.register(query);
  }

  @Post('logout')
  async logout(@Req() req: Request) {
    await this.authService.logout(req.user as AuthPayload);
    return ResponseDataImpl.buildSuccess(null, 'app.text.logout.sucess');
  }
}

const writeTokens = (
  res: Response,
  accessToken: string,
  refreshToken: string,
) => {
  res.setHeader(HEADER_X_ACCESS_TOKEN, accessToken);
  res.cookie(COOKIE_REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: REFRESH_TOKEN_EXPIRE * 1000,
  });
};
