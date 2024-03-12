import { Request, Response, NextFunction } from 'express';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Log requests
    Logger.log(
      `[START REQUEST] [${new Date().toLocaleString()}] ${req.method} ${req.originalUrl}`,
    );
    if (req.method !== 'GET') {
      Logger.log(`[REQUEST BODY] ${JSON.stringify(req.body)}`);
    }

    const start = new Date().getTime();
    // Log the response
    res.on('finish', () => {
      const duration = new Date().getTime() - start;
      Logger.log(
        `[END REQUEST] [${new Date().toLocaleString()}] ${res.statusCode} ${req.method} ${
          req.originalUrl
        } - ${duration}ms`,
      );
    });

    next();
  }
}
