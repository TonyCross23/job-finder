import { HttpStatusCode } from '../config/httpStatusCode.js';

export class AppError extends Error {
  public statusCode: HttpStatusCode;

  constructor(message: string, statusCode: HttpStatusCode) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
    this.name = this.constructor.name;
  }
}
