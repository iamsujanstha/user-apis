import {Injectable} from "@nestjs/common";
import {IUserInterface} from "../interface/user.interface";
import {UserListDto} from "../dto/userList.dto";

@Injectable()
export class UserService implements IUserInterface{
    public constructor(

    ) {}

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