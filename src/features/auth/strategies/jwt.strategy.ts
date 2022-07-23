import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { keys } from 'src/utils/getKeys';
import AuthService from '../services/auth.service';
import { TokenPayload } from '../interfaces/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(public authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: keys.publicKey,
    });
  }

  async validate(payload: TokenPayload) {
    // console.log({ payload });
    const user = await this.authService.userExists(payload.email);

    if (!user) {
      throw new UnauthorizedException({
        message: 'invalid credentials',
        success: false,
      });
    }
    return { ...user };
  }
}
