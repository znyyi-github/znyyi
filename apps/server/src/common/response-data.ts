import { ResponseData } from '@znyyi/shared';

export class ResponseDataImpl<T = unknown> implements ResponseData<T> {
  code: string;
  message: string;
  data: T | null;
  constructor(data: T | null = null, code: string = '0', message: string = '') {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  static buildFailure<T = unknown>(
    message: string = '',
    code: string = '1',
    data: T | null = null,
  ) {
    return new ResponseDataImpl(data, code, message);
  }

  static buildSuccess<T = unknown>(
    data: T | null = null,
    message: string = '',
    code: string = '0',
  ) {
    return new ResponseDataImpl(data, code, message);
  }
}
