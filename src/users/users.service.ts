import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async findOne(userId): Promise<User> {
    const user = await this.userModel.findById(userId);
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username: username });
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const duplicateUser = await this.userModel.findOne({ username : createUserDto.username })
    const duplicateEmail = await this.userModel.findOne({ email: createUserDto.email })

    if( duplicateUser || duplicateEmail) {
      return null;
    }
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async update(userId, createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(userId, createUserDto, { new: true });
    return user;
  }

  async delete(userId): Promise<User> {
    const user = await this.userModel.findByIdAndRemove(userId);
    return user;
  }
}
