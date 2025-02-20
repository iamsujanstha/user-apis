import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from '@module/auth/services/auth.service';
import { AuthController } from '@module/auth/controller/auth.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '@module/user/entity/user.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret', // Use env variable
      signOptions: { expiresIn: '1h' }, // Token expiry time
    }),
  ],
  providers: [AuthService, JwtService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
