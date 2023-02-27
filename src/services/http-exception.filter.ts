import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Logger } from './logger/logger.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger('HTTP');

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMessage =
      exception instanceof HttpException
        ? exception.getResponse()['message']
        : exception.toString();

    const responseBody = {
      statusCode,
      message: errorMessage,
      error: exception.constructor.name,
    };

    httpAdapter.reply(res, responseBody, statusCode);

    this.logger.error(`HTTP request:
  • method: ${httpAdapter.getRequestMethod(req)}
  • url: ${req.url}
  • request body: ${JSON.stringify(req.body)}
  • response status code: ${res.statusCode}
  • error message: ${errorMessage}`);
  }
}
