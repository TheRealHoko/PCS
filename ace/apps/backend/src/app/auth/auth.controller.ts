import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '@ace/shared';
import { RegisterDto } from '@ace/shared';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    return await this.authService.login(signInDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post('verify')
  async verify(@Body('email') email: string, @Body('token') token: string) {
    this.authService.verify(email, token);
  }
}
