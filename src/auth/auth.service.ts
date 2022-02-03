import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
  console.log('validate', username, pass);
    const user = await this.usersService.findByName(username);
    if (user && user.password === crypto.createHmac('sha256', pass).digest('hex')) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
  console.log('login', user);
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

