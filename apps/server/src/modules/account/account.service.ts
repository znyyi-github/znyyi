import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from './account.entity';
import type { LoginQuery, RegisterQuery } from '@znyyi/shared';
import { AcceptedDataException } from 'src/common/accepted-data-exception';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async findUserAndPwd(query: LoginQuery) {
    const { user, pwd } = query;
    const data = await this.accountRepository.findOne({ where: { user, pwd } });
    return data;
  }

  async findUser(query: LoginQuery) {
    const { user } = query;
    const data = await this.accountRepository.findOne({ where: { user } });
    return data;
  }

  async getUserProfile(
    user: string,
  ): Promise<Exclude<AccountEntity, 'pwd' | '_id'> | null> {
    const data = await this.accountRepository.findOne({
      where: { user },
    });
    if (data) {
      delete (data as Partial<AccountEntity>).pwd;
      delete (data as Partial<AccountEntity>)._id;
    }
    return data;
  }

  async createOne(query: RegisterQuery) {
    //TODO 登录校验改成用注释器
    //TODO ResponseDataImpl添加静态方法buildFailure、buildSuccess

    const userReg = /^[^\s]{2,8}$/;
    const pwdReg = /^[\w,.?;'"<>/|\\:!@##$%^&*()-=+]{6,16}$/;

    const { user, pwd } = query;

    if (!userReg.test(user) || !pwdReg.test(pwd)) {
      //说明此时数据不符合要求应该返回前端
      throw new AcceptedDataException('app.text.data_type_error');
    }
    // //检测用户名是否已经存在
    const data = await this.findUser(query);
    if (data) {
      throw new AcceptedDataException('app.text.uer_exists');
    }

    // //创建账号
    await this.accountRepository.save({ user, pwd });
  }
}
