import { Injectable, NestMiddleware } from '@nestjs/common';
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

      this.logger.log(message);
    });

    next();
  }
}
