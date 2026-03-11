import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccountModule } from '../account/account.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginStrategy } from './login.strategy';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenEntity } from './refresh-token.entity';
import { CONFIG_JWT_SECRET } from './auth-data';
import { JwtGuardProvider } from './auth-provider';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshTokenEntity]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>(CONFIG_JWT_SECRET),
        signOptions: { expiresIn: '2H' },
      }),
      inject: [ConfigService], // 注入环境变量服务
    }),
    AccountModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LoginStrategy, JwtGuardProvider, JwtStrategy],
})
export class AuthModule {}
