import { ArgumentsHost, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";
import { appendFileSync } from 'fs';

export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = this.getStatusCode(exception);
    const message = this.getErrorMessage(exception);
    const responseToUser = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    };

    appendFileSync('errors.log', `[${responseToUser.timestamp}] ${status} - ${message}\n`);

    response
      .status(status)
      .json(responseToUser);
  }

  private getStatusCode(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }
    if (typeof exception === 'object' && exception !== null && 'status' in exception) {
      return (exception as { status: number }).status;
    }
    return 500;
  }

  private getErrorMessage(exception: unknown): string {
    if (exception instanceof Error) {
      return exception.message;
    }
    if (typeof exception === 'string') {
      return exception;
    }
    return 'Internal server error';
  }
}
