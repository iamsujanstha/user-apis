import {
  Controller,
  Post,
  Body,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from '@module/auth/dto/auth.dto';
import { Response } from 'express';
import { AuthService } from '@module/auth/services/auth.service';
import { Public } from '@shared/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() authDto: AuthDto, @Res() res: Response) {
    return this.authService.loginUser(authDto, res);
  }

  @Public()
  @Post('refresh')
  async refresh(@Body() body, @Res() res: Response) {
    const { userId, refreshToken } = body;
    if (!userId || !refreshToken) {
      throw new UnauthorizedException('Refresh token and user ID are required');
    }
    return this.authService.refreshAccessToken(userId, refreshToken, res);
  }
}
