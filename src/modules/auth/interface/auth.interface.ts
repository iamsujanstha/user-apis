import { AuthDto } from '@module/auth/dto/auth.dto';
import { Response } from 'express';

export interface AuthUser {
  userId: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface AuthInterface {
  loginUser(auth: AuthDto, res: Response);
}
