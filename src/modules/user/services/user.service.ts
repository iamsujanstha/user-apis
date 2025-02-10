/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUserInterface } from '../interface/user.interface';
import { Injectable } from '@nestjs/common';
import { UserListDto } from '../dto/userList.dto';
import { UserRepository } from 'src/modules/user/repo/user.repository';

@Injectable()
export class UserService implements IUserInterface {
  public constructor(userRepo: UserRepository) {}

  createUser(user: UserListDto): Promise<UserListDto> {
    return Promise.resolve(undefined);
  }

  deleteUser(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  getUserList(): Promise<UserListDto> {
    return Promise.resolve(undefined);
  }

  updateUser(user: UserListDto): Promise<UserListDto> {
    return Promise.resolve(undefined);
  }
}
