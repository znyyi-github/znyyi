export interface LoginQuery {
  user: string;
  pwd: string;
}
export interface LoginResponse {
  user: string;
  photo: string;
}
export type RegisterQuery = LoginQuery;
export type UserProfileResponse = LoginResponse;
export interface ResponseData<T = unknown> {
  code: string;
  message: string;
  data: T | null;
}

// export interface CheckResponse {
//   needRefresh: boolean;
// }
