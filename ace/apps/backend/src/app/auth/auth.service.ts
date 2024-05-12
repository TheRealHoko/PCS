import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
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

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  async login(signInDto: SignInDto): Promise<LoginResponse> {
    const { email, password } = signInDto;

    const user = await this.usersService.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.status) {
      throw new BadRequestException('User not verified');
    }

    const isAuthorized = await bcrypt.compare(password, user.hash);

    if (!isAuthorized) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: AceJwtPayload = {
      sub: user.id.toString(),
      email: user.email,
      roles: user.roles.map((role) => role.name) as RoleEnum[],
    };

    return { token: await this.jwtService.signAsync(payload) };
  }

  async register(registerInfo: RegisterDto) {
    const isEmailAlreadyExist = await this.usersService.findOne({
      email: registerInfo.email,
    });
    if (isEmailAlreadyExist) {
      throw new BadRequestException('Email already exists');
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
        email_verification_token: token,
      };

      this.mailService.sendVerificationMail(registerInfo.email, token);
      this.usersService.create(user);
    });
  }

  async verify(email: string, token: string) {
    if (!token) {
      throw new Error('Verification token missing');
    }

    try {
      const user: User = await this.usersService.findOne({
        email_verification_token: token,
        email: email,
      });

      user.status = true;

      this.usersService.update(user.id, { status: true });
    } catch (error) {
      this.logger.error((error as HttpException).message);
    }
  }
}
