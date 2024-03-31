import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from './dto/register.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async signIn(signInDto: SignInDto): Promise<any> {
        const {email, password} = signInDto;

        try {
            const user = await this.usersService.findOne({email});
            
            if (!user) {
                throw new UnauthorizedException("Invalid credentials");
            }
    
            const isAuthorized = await bcrypt.compare(password, user.hash);
    
            if (!isAuthorized) {
                throw new UnauthorizedException("Invalid credentials");
            }
    
            const payload = {sub: user.id, email: user.email, roles: user.roles.map(x => x.name)};
    
            return { token: await this.jwtService.signAsync(payload) };
        } catch (error) {
            if (error.status === 404) {
                throw new UnauthorizedException("Invalid credentials");
            }
        }
    }

    async register(registerInfo: RegisterDto) {
        const isEmailAlreadyExist = await this.usersService.findOne({email: registerInfo.email});
        console.log(isEmailAlreadyExist);
        if (isEmailAlreadyExist) {
            throw new BadRequestException("Email already exists");
        }

        const user: CreateUserDto = {
            email: registerInfo.email,
            firstname: registerInfo.firstname,
            lastname: registerInfo.lastname,
            password: registerInfo.password,
            tel: registerInfo.tel,
            address: registerInfo.address
        };

        this.usersService.create(user);
    }
}
