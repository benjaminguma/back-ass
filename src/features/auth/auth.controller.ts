import { Body, Controller, Post } from '@nestjs/common';

const AuthRouteNames = {
  BASE: 'auth',
  LOGIN: 'login',
  SIGNUP: 'signup',
  LOGOUT: 'logout',
};

@Controller(AuthRouteNames.BASE)
export class AuthController {
  constructor() {}

  @Post(AuthRouteNames.LOGIN)
  async login(@Body() loginDetails) {
    return 'login route';
  }

  @Post(AuthRouteNames.SIGNUP)
  async signup(@Body() signupDetails) {
    return 'singup route';
  }
}
