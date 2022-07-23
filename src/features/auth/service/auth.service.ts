import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from '../model/users.entity';

Injectable();
export class AuthService {
  constructor() {}

  async userExists(email: string) {}

  async signUp(email: string, hashedPassword: string) {}

  logout() {}
}
