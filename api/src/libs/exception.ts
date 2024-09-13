import { HttpStatusCode } from 'axios';

export default class HttpException extends Error {
  constructor(statusCode?: number, message?: string) {
    super(message);
    this.status = statusCode ?? HttpStatusCode.InternalServerError;
  }

  status: number = HttpStatusCode.InternalServerError;
}
