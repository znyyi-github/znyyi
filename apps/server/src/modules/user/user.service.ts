import { Body, Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
@Injectable()
export class UserService {
  constructor(private accountService: AccountService) {}

  getUserProfile(user: string) {
    return this.accountService.getUserProfile(user);
  }
}
