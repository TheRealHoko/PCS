import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(200)
    @Post('login')
    async signIn(@Body() signInDto: SignInDto) {
        return await this.authService.signIn(signInDto);
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return await this.authService.register(registerDto);
    }
}
