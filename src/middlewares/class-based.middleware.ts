import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// `@Injectable()` allows dependency injection in this middleware
@Injectable()
export class Middleware2 implements NestMiddleware {
  /**
   * Dependency injection in class-based middleware
   * Example: Injecting a logging service or database service.
   */
  constructor(/* private readonly loggerService: LoggerService */) {}

  /**
   * The `use` method is required for NestMiddleware.
   *
   * @param req - Incoming HTTP request
   * @param res - Outgoing HTTP response
   * @param next - Calls the next middleware or route handler
   */
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Class-based middleware executed:', req.method, req.url);

    // Call the next middleware in the stack
    next();
  }
}
