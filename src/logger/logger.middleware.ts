import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    res.on('close', () => {
      const message = `HTTP request:
  • method: ${req.method}
  • url: ${req.url}
  • query parameters: ${JSON.stringify(req.query)}
  • request body: ${JSON.stringify(req.body)}
  • response status code: ${res.statusCode}`;

      switch (res.statusCode) {
        case HttpStatus.FORBIDDEN:
        case HttpStatus.BAD_REQUEST:
        case HttpStatus.NOT_FOUND:
        case HttpStatus.UNPROCESSABLE_ENTITY:
        case HttpStatus.INTERNAL_SERVER_ERROR:
          this.logger.error(message);
          break;
        default:
          this.logger.log(message);
      }
    });

    next();
  }
}
