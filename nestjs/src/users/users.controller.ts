import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')

export class UsersController {
    constructor(private usersService: UsersService){
       
    }
  @Get('users')
  getAll(): CreateUserDto[] {
    return this.usersService.getUsers();
  }
  @Get('/user')
  getOne(@Param('_id') _id: string): string {
    return 'User' + _id;
  }
  @Post('/addUser')
  @HttpCode(HttpStatus.CREATED)
  postUser(@Body() body: CreateUserDto): CreateUserDto {
    return this.usersService.postUser(body);
  }
  @Put('/putUser')
  @HttpCode(HttpStatus.OK)
  putUser(@Param('id') _id:string, @Body() body: CreateUserDto): CreateUserDto {
    return body;
  }
  @Delete('/deleteUser')
  deleteUser(@Param() _id: string): string {
    return ' User' + _id;
  }
}
