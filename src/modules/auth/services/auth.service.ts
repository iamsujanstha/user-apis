import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthInterface } from '@module/auth/interface/auth.interface';
import { AuthDto } from '@module/auth/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from '@module/user/entity/user.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class AuthService implements AuthInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: EntityRepository<User>, // ✅ Injecting correctly
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(auth: AuthDto, res: Response): Promise<void> {
    const { email, password } = auth;

    if (!this.userRepo) {
      throw new Error('UserRepository is not initialized');
    }

    const user = await this.userRepo.findOne({ email });

    if (!user) throw new UnauthorizedException('Invalid email or password');
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid email or password');

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    user.refreshToken = await bcrypt.hash(refreshToken, 10);

    await this.userRepo.getEntityManager().persistAndFlush(user);

    // Set cookies in response
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.send({
      status: 'success',
      message: 'User logged in successfully',
    });
  }

  private generateAccessToken(user: User): string {
    return this.jwtService.sign(
      { id: user.id, email: user.email },
      { secret: process.env.JWT_SECRET || 'accessSecret', expiresIn: '15m' },
    );
  }

  private generateRefreshToken(user: User): string {
    return this.jwtService.sign(
      { id: user.id },
      {
        secret: process.env.JWT_REFRESH_SECRET || 'refreshSecret',
        expiresIn: '7d',
      },
    );
  }

  async refreshAccessToken(
    userId: number,
    refreshToken: string,
    res: Response,
  ) {
    const user = await this.userRepo.findOne({ id: userId });

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Validate refresh token
    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Generate a new access token
    const newAccessToken = this.generateAccessToken(user);

    // Update access token in cookies
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.send({
      status: 'success',
      message: 'Successfully get refresh token',
    });
  }
}
