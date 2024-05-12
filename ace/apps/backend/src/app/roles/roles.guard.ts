import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Request } from "express";
import { Role } from './enums/role.enum';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { User } from '@ace/shared';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersSerive: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  private readonly logger = new Logger(RolesGuard.name);

  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    const request = context.switchToHttp().getRequest();
    
    if (!requiredRoles) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("No token provided");
    }
    
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get<string>('SECRET')
        }
      );
      
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException("Wrong token");
    }
    
    const user = await this.usersSerive.findOne({ email: request.user.email });
    const userRoles = user.roles.map((role) => role.name)
    
    return requiredRoles.some((role) => userRoles?.includes(role));
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

