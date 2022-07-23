import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { keys } from 'src/utils/getKeys';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
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
  providers: [AuthService],
  exports: [PassportModule],
})
export default class AuthModule {}
