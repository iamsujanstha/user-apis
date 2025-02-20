import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) {
      return true; // Allow access to public routes
    }

    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = request.cookies?.accessToken; // Read token from cookies

    if (!accessToken) {
      throw new UnauthorizedException('Access denied. No token provided.');
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET) as any;
      // request.user = decoded; // Attach user data to the request
      if (decoded) {
        // request.user = decoded; // Attach user data to the request
        return true; // Grant access
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token', error);
    }
  }
}
