import { Controller, Body, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import type { Request } from 'express';
import { AuthPayload } from '../auth/auth-data';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getUserProfile(@Req() req: Request) {
    const { user } = req.user as AuthPayload;
    return this.userService.getUserProfile(user);
  }
}
