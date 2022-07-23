import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from '../model/users.entity';

Injectable();
export default class UserService {
  constructor(
    @InjectRepository(user) private readonly userMg: Repository<user>,
  ) {}

  async userExists(email: string): Promise<user> {
    const user = await this.userMg.findOne({ where: { email } });
    return user;
  }

  async createUser(email: string, password: string) {
    const newUser = this.userMg.create({
      email,
      password,
    });
    return await this.userMg.save(newUser);
  }
}
