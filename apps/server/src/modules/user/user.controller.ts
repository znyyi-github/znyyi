import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import type { LoginQuery } from '@znyyi/shared';

@Controller('user')
export class UserController {
  constructor(private readonly loginService: UserService) {}

  @Post('login')
  login(@Body() query: LoginQuery) {
    return this.loginService.login(query);
  }
}
