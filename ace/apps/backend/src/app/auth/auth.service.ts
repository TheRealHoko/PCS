import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  AceJwtPayload,
  LoginResponse,
  RegisterDto,
  RoleEnum,
} from '@ace/shared';
import { CreateUserDto } from '@ace/shared';
import { SignInDto } from '@ace/shared';
import { User } from '../users/entities/user.entity';
import { MailService } from '../services/mail.service';
import { randomBytes } from 'crypto';
import { promisify } from "util";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly randomBytesAsync = promisify(randomBytes);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  async login(signInDto: SignInDto): Promise<LoginResponse> {
    Logger.log(2);
    const { email, password } = signInDto;
    Logger.log(3);

    const user = await this.usersService.findOne({
      where: { email }
    });
    Logger.log(4);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.status) {
      throw new BadRequestException('User not verified');
    }
    Logger.log(5);

    Logger.log("BCRYPT crash here in container");
    const isAuthorized = await bcrypt.compare(password, user.hash);
    Logger.log(6);

    if (!isAuthorized) {
      throw new UnauthorizedException('Invalid credentials');
    }
    Logger.log(7);

    const payload: AceJwtPayload = {
      sub: user.id.toString(),
      email: user.email,
      roles: user.roles.map((role) => role.name) as RoleEnum[],
    };
    Logger.log(8);

    return { token: await this.jwtService.signAsync(payload) };
  }

  async register(registerInfo: RegisterDto) {
    try {
      const isEmailAlreadyExist = await this.usersService.findOne({
        where: {
          email: registerInfo.email,
        }
      });

      if (isEmailAlreadyExist) {
        throw new BadRequestException('Email already exists');
      }

    } catch (error) {
      if (error.status === 404) {
        this.logger.log('User not found');
      }
      else if (error.status === 400) {
        throw new BadRequestException('Email already exists');
      }
    }
    
    const buf = await this.randomBytesAsync(48);
    const token = buf.toString('hex');
    console.log(token);
    const user: CreateUserDto = {
      email: registerInfo.email,
      firstname: registerInfo.firstname,
      lastname: registerInfo.lastname,
      password: registerInfo.password,
      phone: registerInfo.phone,
      address: registerInfo.address,
      email_verification_token: token,
    };

    this.mailService.sendVerificationMail(registerInfo.email, token);
    return this.usersService.create(user);
  }

  async verify(email: string, token: string) {
    if (!token) {
      throw new Error('Verification token missing');
    }

    try {
      const user: User = await this.usersService.findOne({
        where: {
          email_verification_token: token,
          email: email,
        }
      });

      user.status = true;

      this.usersService.update(user.id, { status: true });
    } catch (error) {
      this.logger.error((error as HttpException).message);
    }
  }
}
