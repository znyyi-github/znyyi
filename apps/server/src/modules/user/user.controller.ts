import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import type { LoginQuery } from '@znyyi/shared';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  xx(@Body() query: LoginQuery) {
    return this.userService.findUserAndPwd(query);
  }
}
