import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import type { LoginQuery } from '@znyyi/shared';
import { ResponseDataImpl } from 'src/common/response-data';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly loginRepository: Repository<UserEntity>,
  ) {}
  async login(query: LoginQuery) {
    const { user, pwd } = query;
    const data = await this.loginRepository.findOne({ where: { user, pwd } });

    if (!data) {
      // const r = await this.loginRepository.save({
      //   user,
      //   pwd,
      // });
      // console.log('iii', r);
      // return { data: { user, pwd } };

      const res = new ResponseDataImpl(null, '1', 'app.text.none_user');
      return res;
    }
    const res = new ResponseDataImpl(
      { user },
      '0',
      'app.text.user_login_success',
    );
    return res;
  }
}
