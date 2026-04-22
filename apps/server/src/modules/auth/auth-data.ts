import { SetMetadata } from '@nestjs/common';

// AuthPayload：jwt 解码后的json对象
export interface AuthPayload {
  user: string;
  exp?: number;
  accessToken?: string; // 例外，为了存储新的accessToken
  refreshToken?: string; // 例外，为了传递refreshToken
}

export const CONFIG_JWT_SECRET = 'JWT_SECRET';

export const HEADER_X_ACCESS_TOKEN = 'x-access-token';
export const COOKIE_REFRESH_TOKEN = 'refresh_token';

/** 刷新阈值，10 分钟 */
export const REFRESH_THRESHOLD = 10 * 60;
/** refresh token过期时间，7天 */
export const REFRESH_TOKEN_EXPIRE = 7 * 24 * 60 * 60;

export const IS_AUTH_PUBLIC_KEY = 'isAuthPublic';
// 自定义装饰器
export const AuthPublic = () => SetMetadata(IS_AUTH_PUBLIC_KEY, true);
