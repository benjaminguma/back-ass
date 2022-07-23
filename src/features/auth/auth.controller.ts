import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import AuthService from './services/auth.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const SALT_ROUNDS = 10;

const AuthRouteNames = {
  BASE: 'auth',
  LOGIN: 'login',
  SIGNUP: 'signup',
  LOGOUT: 'logout',
};

@Controller(AuthRouteNames.BASE)
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly jwtChunk: JwtService,
  ) {}

  @Post(AuthRouteNames.LOGIN)
  async login(@Body() loginDetails) {
    try {
      const { email, password } = loginDetails;
      const user = await this.auth.userExists(email);
      if (!user) {
        throw new UnauthorizedException({
          message: 'invalid login credentials',
          success: false,
        });
      }
      const isValidPassWord = await bcrypt.compare(password, user.password);
      if (!isValidPassWord)
        throw new UnauthorizedException({
          success: false,
          message: 'invalid credentials please try again',
        });

      return {
        access_token: this.jwtChunk.sign({ email, sub: user.u_id }),
        success: true,
      };
    } catch (error) {
      return error;
    }
  }

  @Post(AuthRouteNames.SIGNUP)
  async signup(@Body() signupDetails) {
    try {
      const { email, password } = signupDetails;

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const newUser = await this.auth.signUp(email, hashedPassword);
      const token = this.jwtChunk.sign({
        email: newUser.email,
        sub: newUser.u_id,
      });
      return {
        access_token: token,
        success: true,
      };
    } catch (error) {
      return error;
    }
  }

  @Post(AuthRouteNames.LOGOUT)
  logout() {}
}
