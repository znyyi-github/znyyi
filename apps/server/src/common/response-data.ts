import { ResponseData } from '@znyyi/shared';

export class ResponseDataImpl<T> implements ResponseData<T> {
  code: string;
  message: string;
  data: T | null;
  constructor(data: T | null = null, code: string = '0', message: string = '') {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
