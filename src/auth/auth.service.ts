import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const matchedPasswords = await bcrypt.compare(pass, user.password)

    if (user && matchedPasswords === pass) {
      // const { password, ...result } = user;
      return {
        id: user.id,
        username: user.username,
        email: user.email
      };
    }
    return null;
  }

  async login(user: any) {
    // create token with username and userid as payload
    // we choose a property name of 'sub' to hold our userId value to be consistent with JWT standards
    const payLoad = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payLoad) // token
    }
  }
}