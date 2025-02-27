import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable() // Allows dependency injection in NestJS
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger(LoggingMiddleware.name); // Correct way to use Logger

  /**
   * Middleware to log HTTP request details.
   * Logs request method, URL, status code, and response time.
   */
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl: url } = req;
    const reqTime = new Date().getTime(); // Capture request start time

    // Listen for the response to finish
    res.on('finish', () => {
      const { statusCode } = res;
      const resTime = new Date().getTime(); // Capture response end time
      const duration = resTime - reqTime; // Calculate response duration

      // Only log successful (200 or 201) responses
      if (statusCode === 200 || statusCode === 201) {
        this.logger.log(`${method} ${url} ${statusCode} - ${duration} ms`);
      }
    });
    next(); // Move to the next middleware/controller
  }
}
