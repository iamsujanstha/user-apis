import {UserService} from "../services/user.service";
import {Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {UserListDto} from "../dto/userList.dto";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @ApiOperation({summary: 'Get user list'})
    @ApiResponse({status: 200, description: 'The record has been successfully created.'})
    public async getUserList(): Promise<UserListDto>{
        return this.userService.getUserList()
    }

    @Post()
    @ApiOperation({summary: 'Create user'})
    @ApiResponse({status: 200, description: 'The record has been successfully created.'})
    public async createUser(user: UserListDto): Promise<UserListDto>{
        return this.userService.createUser(user);
    }

    @Delete('/:id')
    @ApiOperation({summary: 'Delete user'})
    @ApiResponse({status: 200, description: 'The record has been successfully created.'})
    public async deleteUser(@Param('id') id: string): Promise<void>{
        return this.userService.deleteUser(id);
    }

    @Put()
    @ApiOperation({summary: 'Update user'})
    @ApiResponse({status: 200, description: 'The record has been successfully created.'})z
    public async updateUser(user: UserListDto): Promise<UserListDto>{
        return this.userService.updateUser(user);
    }

}