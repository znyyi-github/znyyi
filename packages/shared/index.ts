export interface LoginQuery {
  user: string;
  pwd: string;
}

export type RegisterQuery = LoginQuery;
export interface ResponseData<T = unknown> {
  code: string;
  message: string;
  data: T | null;
}
