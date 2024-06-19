import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { RoleEnum } from '@ace/shared';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  private readonly logger = new Logger(RolesGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('SECRET'),
      });
      
      request['user'] = payload;

      if (!requiredRoles) {
        return true;
      }
      
    } catch {
      throw new UnauthorizedException('Wrong token');
    }

    try {
      const options = { 
        where: {
          email: request.user.email
        }
      };

      this.logger.debug(options);
      const user = await this.usersService.findOne(options);
      
      this.logger.log(`User ${user.email} has roles ${user.roles.map((role) => role.name).join(', ')}`);

      const userRoles = user.roles.map((role) => role.name);

      return requiredRoles.some((role) => userRoles?.includes(role));
    } catch (error) {
      this.logger.log(`What the fuck`);
      
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
