import { HttpException, HttpStatus } from '@nestjs/common';

export interface ExceptionResponse {
  statusCode: number;
  errorCode?: string;
  timestamp?: string;
  path?: string;
  message: string;
}

export class AppException extends HttpException {
  constructor(message: string, status: HttpStatus, errorCode?: string) {
    super(
      {
        statusCode: status,
        errorCode: errorCode || HttpStatus[status],
        timestamp: new Date().toISOString(),
        message,
      } as ExceptionResponse,
      status,
    );
  }
}
