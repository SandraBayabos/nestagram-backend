import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Put, Delete, Body, HttpException } from '@nestjs/common';
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

  @Get('user/:username')
  async findByUsername(@Param('username') username: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if(!user) {
      throw new NotFoundException('There is no user with this username!')
    }
    return {
      id: user.id,
      username: user.username,
      email: user.email
    }
  }

  // @Get('user/:id')
  // async findOne(@Param('id') id: string): Promise<any> {
  //   const user = await this.usersService.findOne(id);
  //   if(!user) {
  //     throw new NotFoundException('No user with this id exists!')
  //   }
  //   return {
  //     id: user.id,
  //     username: user.username,
  //     email: user.email
  //   }
  // }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    const newUser = await this.usersService.create(createUserDto);
    if(!newUser) {
      throw new HttpException('Username or Email already exists. Pick another.', HttpStatus.NON_AUTHORITATIVE_INFORMATION)
    }
    return {
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    }
  }

  @Put('edit/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto): Promise<any> {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    return {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res): Promise<User> {
    const deletedUser = await this.usersService.delete(id);
    return res.status(HttpStatus.OK).json({
      message: `User has been successfully deleted`,
      user: deletedUser
    })

  }
}
