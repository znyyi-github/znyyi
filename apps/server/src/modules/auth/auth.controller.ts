import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { LoginQuery, RegisterQuery } from '@znyyi/shared';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() query: LoginQuery) {
    return this.authService.login(query);
  }

  @Post('register')
  register(@Body() query: RegisterQuery) {
    return this.authService.register(query);
  }

  @Post('check')
  check() {
    return this.authService.check();
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }
}
