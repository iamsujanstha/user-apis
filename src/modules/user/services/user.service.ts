/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserInterface } from '../interface/user.interface';
import { UserDto } from '../dto/user.dto';
import { User } from 'src/modules/user/entity/user.entity';
import { UserRepository } from 'src/modules/user/repo/user.repository';
import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements IUserInterface {
  public constructor(
    @InjectRepository(User) private readonly userRepo: UserRepository,
  ) {}

  async createUser(userDto: UserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = this.userRepo.create({
      firstName: userDto.firstName,
      middleName: userDto.middleName,
      lastName: userDto.lastName,
      email: userDto.email,
      password: hashedPassword,
    });

    await this.userRepo.getEntityManager().persistAndFlush(user);

    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepo.findOne(+id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepo.nativeDelete(+id);
  }

  public async getUserList(
    page: number,
    limit: number,
  ): Promise<{ data: User[]; total: number }> {
    const offset = (page - 1) * limit;

    return await this.userRepo.findAllUsers(limit, offset);
  }

  async updateUser(id: string, userDto: UserDto): Promise<User> {
    const user = await this.userRepo.findOne(+id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    /* Updates user properties with values from userDto */
    wrap(user).assign(userDto);

    if (userDto.password) {
      user.password = await bcrypt.hash(userDto.password, 10);
    }

    /*Save to DB*/
    await this.userRepo.getEntityManager().flush();

    return user;
  }
}
