import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserRepository } from '@module/user/repo/user.repository';
import { UserController } from '@module/user/controllers/user.controller';
import { UserService } from '@module/user/services/user.service';
import { User } from '@module/user/entity/user.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [MikroOrmModule.forFeature([User])],
  exports: [UserService, UserRepository],
})
export class UserModule {}
