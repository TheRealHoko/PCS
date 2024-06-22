import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`${req.method} ${res.statusCode} ${req.baseUrl} ${JSON.stringify(req.body)}`);
    next();
  }
}
