import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import {
  AuthPayload,
  HEADER_X_ACCESS_TOKEN,
  IS_AUTH_PUBLIC_KEY,
} from './auth-data';
import { Response } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isAuthPublic = this.reflector.getAllAndOverride<boolean>(
      IS_AUTH_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isAuthPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest<TUser extends AuthPayload = AuthPayload>(
    err: unknown,
    user: TUser,
    info: { message?: string },
    context: ExecutionContext,
    status?: any,
  ) {
    const { accessToken } = user;
    if (accessToken) {
      const res: Response = context.switchToHttp().getResponse();
      res.setHeader(HEADER_X_ACCESS_TOKEN, accessToken);
    }
    return super.handleRequest<TUser>(err, user, info, context, status);
  }
}
