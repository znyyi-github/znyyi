import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import type { LoginQuery } from '@znyyi/shared';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(@Body() query: LoginQuery) {
    return this.loginService.login(query);
  }
}
