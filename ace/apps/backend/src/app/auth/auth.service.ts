import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from '@ace/shared';
import { CreateUserDto } from '@ace/shared';
import { SignInDto } from '@ace/shared';
import { User } from '../users/entities/user.entity';
import { MailService } from '../services/mail.service';
import { randomBytes } from "crypto";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService
    ) {}

    async login(signInDto: SignInDto): Promise<any> {
        const {email, password} = signInDto;

        try {
            const user = await this.usersService.findOne({email});
            
            if (!user) {
                throw new NotFoundException("Invalid credentials");
            }
    
            const isAuthorized = await bcrypt.compare(password, user.hash);
    
            if (!isAuthorized) {
                throw new UnauthorizedException("Invalid credentials");
            }
    
            const payload = {sub: user.id, email: user.email};
    
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

        randomBytes(48, (err, buf) => {
            if (err) {
                throw err;
            }

            const token = buf.toString('hex');
            console.log(token);
            const user: CreateUserDto = {
                email: registerInfo.email,
                firstname: registerInfo.firstname,
                lastname: registerInfo.lastname,
                password: registerInfo.password,
                phone: registerInfo.phone,
                address: registerInfo.address,
                email_verification_token: token
            };
    
            this.mailService.sendVerificationMail(registerInfo.email, token);
            this.usersService.create(user);
        });
    }

    async verify(email: string, token: string) {
        if (!token) {
            throw new Error('Verification token missing');
        }

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
