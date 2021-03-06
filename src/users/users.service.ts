import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  // async findOne(userId): Promise<User> {
  //   const user = await this.userModel.findById(userId);
  //   return user;
  // }

  async findOne(username: string): Promise<User | undefined> {
      return await this.userModel.findOne({ username: username });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const duplicateUser = await this.userModel.findOne({ username : createUserDto.username })
    const duplicateEmail = await this.userModel.findOne({ email: createUserDto.email })

    if( duplicateUser || duplicateEmail) {
      return null;
    }
    // use bcrypt to hash password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
    // save password as hashed password
    createUserDto.password = hashedPassword;
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  async update(userId, updateUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
    return user;
  }

  async delete(userId): Promise<User> {
    const user = await this.userModel.findByIdAndRemove(userId);
    return user;
  }
}
