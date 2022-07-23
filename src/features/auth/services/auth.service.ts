import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from '../model/users.entity';

Injectable();
export default class AuthService {
  constructor(
    @InjectRepository(user) private readonly userMg: Repository<user>,
  ) {}

  async userExists(email: string) {
    const user = await this.userMg.findOne({ where: { email } });
    return user;
  }

  async signUp(email: string, hashedPassword: string) {
    if (await this.userExists(email)) {
      throw new UnauthorizedException({
        message: 'user already exists please login',
        success: false,
      });
    }
    const newUser = this.userMg.create({
      email,
      password: hashedPassword,
    });
    return await this.userMg.save(newUser);
  }

  logout() {}
}
