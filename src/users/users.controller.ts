import { Controller, Get, Res, HttpStatus, Param, Query, NotFoundException, Post, Put, Delete, Body, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<any> {
    const users = await this.usersService.findAll();
    return users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
    }))
  }

  @Get(':username')
  async findByUsername(@Param('username') username: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if(!user) {
      throw new NotFoundException('There is no user with this username!')
    }
    return {
      id: user.id,
      username: user.username,
      email: user.email
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    if(!user) {
      throw new NotFoundException('No user with this id exists!')
    }
    return {
      id: id,
      username: user.username,
      email: user.email
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    const newUser = await this.usersService.create(createUserDto);
    if(!newUser) {
      throw new HttpException('Username or Email already exists. Pick another.', HttpStatus.BAD_REQUEST)
    }
    return {
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    }
  }

  @Put(':id')
  async update(@Param('id') @Body() createUserDto: CreateUserDto, id: string): Promise<User> {
    const updatedUser = await this.usersService.update(id, createUserDto);
    return updatedUser;
  }
}
