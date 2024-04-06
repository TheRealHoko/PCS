import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from '@ace/shared';
import { CreateUserDto } from '@ace/shared';
import { SignInDto } from '@ace/shared';
import { User } from '../users/entities/user.entity';
import { MailService } from '../services/mail.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService
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
        if (isEmailAlreadyExist) {
            throw new BadRequestException("Email already exists");
        }

        const user: CreateUserDto = {
            email: registerInfo.email,
            firstname: registerInfo.firstname,
            lastname: registerInfo.lastname,
            password: registerInfo.password,
            phone: registerInfo.phone,
            address: registerInfo.address
        };

        this.mailService.sendVerificationMail(registerInfo.email);
        this.usersService.create(user);
    }

    async verify(email: string, token: string) {
        const user: User = await this.usersService.findOne({
            email_verification_token: token,
            email: email
        });

        if (!user) {
            throw new Error('Validation failed');
        }

        user.status = true;

        this.usersService.update(user.id, { status: true });
    }
}
