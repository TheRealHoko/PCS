import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async signIn(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOne({email});

        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const isAuthorized = await bcrypt.compare(password, user.hash);

        if (!isAuthorized) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const payload = {sub: user.id, email: user.email, roles: user.roles.map(x => x.name)};

        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
