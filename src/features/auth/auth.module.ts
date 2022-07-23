import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import AuthService from './services/auth.service';
import { user } from './model/users.entity';

import { JwtModule } from '@nestjs/jwt';
import { UserService } from './services/user.service';
import { keys } from 'src/utils/getKeys';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PostModule } from '../Post/post.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([user]),
    JwtModule.register({
      publicKey: keys.publicKey,
      privateKey: keys.privateKey,
      signOptions: {
        expiresIn: '10h',
        issuer: 'http://localhost:3000/api/v1/',
        algorithm: 'RS256',
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy],
  exports: [PassportModule],
})
export default class Auth {}
