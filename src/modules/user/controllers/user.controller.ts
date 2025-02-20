import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Body,
  Query,
} from '@nestjs/common';
import { UserService } from '@module/user/services/user.service';
import { User } from '@module/user/entity/user.entity';
import { UserDto } from '@module/user/dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get paginated user list' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved user list.',
  })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  public async getUserList(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = Number.MAX_SAFE_INTEGER.toString(),
  ): Promise<{ data: User[]; total: number }> {
    const pageNumber = Math.max(parseInt(page, 10) || 1, 1);
    const limitNumber = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);
    return await this.userService.getUserList(pageNumber, limitNumber);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully created.',
  })
  public async createUser(@Body() user: UserDto): Promise<User> {
    return this.userService.createUser(user);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
  })
  public async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
  })
  public async updateUser(
    @Param('id') id: string,
    @Body() user: UserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, user);
  }
}
