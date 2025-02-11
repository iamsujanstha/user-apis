import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/modules/user/entity/user.entity';
import { UserRepository } from 'src/modules/user/repo/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [MikroOrmModule.forFeature([User])],
  exports: [UserService],
})
export class UserModule {}
