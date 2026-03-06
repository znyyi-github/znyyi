import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { ResponseDataImpl } from 'src/common/response-data';
import type { LoginQuery, RegisterQuery } from '@znyyi/shared';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly loginRepository: Repository<UserEntity>,
  ) {}

  async findUserAndPwd(query: LoginQuery) {
    const { user, pwd } = query;
    const data = await this.loginRepository.findOne({ where: { user, pwd } });
    return data;
  }

  async findUser(query: LoginQuery) {
    const { user } = query;
    const data = await this.loginRepository.findOne({ where: { user } });
    return data;
  }

  async createOne(query: RegisterQuery) {
    //TODO
    const userReg = /^[^\s]{2,8}$/;
    const pwdReg = /^[\w,.?;'"<>/|\\:!@##$%^&*()-=+]{6,16}$/;

    const { user, pwd } = query;

    if (!userReg.test(user) || !pwdReg.test(pwd)) {
      //说明此时数据不符合要求应该返回前端
      const res = new ResponseDataImpl(null, '1', 'app.text.data_type_error');
      return res;
    }
    // //检测用户名是否已经存在
    const data = await this.findUser(query);
    if (data) {
      const res = new ResponseDataImpl(null, '1', 'app.text.uer_exists');
      return res;
    }

    // //创建账号
    await this.loginRepository.save({ user, pwd });
    const res = new ResponseDataImpl(null, '0', 'app.text.handler.sucess');
    return res;
  }
}
