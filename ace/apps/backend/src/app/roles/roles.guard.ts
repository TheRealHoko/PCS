import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from './roles.decorator';
import { Request } from "express";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector) {}

  private readonly logger = new Logger(RolesGuard.name);

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    this.logger.debug((request as Request));
    this.logger.debug(user);
    return this.matchRoles(roles, user.roles);
  }
  
  private matchRoles(roles: string[], userRoles: string[]): boolean | Promise<boolean> | Observable<boolean> {
    return roles.every(role => userRoles.includes(role));
  }

}

