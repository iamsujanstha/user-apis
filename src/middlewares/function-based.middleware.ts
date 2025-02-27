import { NextFunction, Request, Response } from 'express';

/**
 * Function-based middleware in NestJS.
 *
 * This middleware runs before the request reaches the route handler.
 * It is useful for simple tasks like logging, modifying requests, or adding headers.
 *
 * @param req - The incoming HTTP request
 * @param res - The outgoing HTTP response
 * @param next - Calls the next middleware or route handler
 */
export function middleware1(req: Request, res: Response, next: NextFunction) {
  console.log(`Function-based middleware executed - ${req.method} ${req.url}`);

  // Continue to the next middleware or route handler
  next();
}
