import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment';
import { AceJwtPayload, LoginResponse, RegisterDto } from '@ace/shared';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { Observable, map, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { RoleEnum } from '@ace/shared';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isBrowser: boolean;

  constructor(
    private readonly http: HttpClient,
    @Inject(PLATFORM_ID)
    private readonly platformId: Object,
    private readonly router: Router,
    private readonly usersService: UsersService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  isLoggedIn() {
    const token: JwtPayload | void = this.getDecodedToken();

    return this.isTokenExpired(token);
  }

  isTokenExpired(token: JwtPayload | void) {
    if (token && token.exp) {
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      const isTokenExpired = currentTimeInSeconds >= token.exp;
      console.log(
        `current time: ${currentTimeInSeconds}, token exp: ${token.exp}, is expired ? ${isTokenExpired}`
      );
      return !isTokenExpired;
    }
    return false;
  }

  hasRoles(roles: RoleEnum[]): Observable<boolean> {
    const token = this.getDecodedToken();
    if (!token || !token.sub) {
      return of(false);
    }

    return this.usersService.getUser(+token.sub).pipe(
      map((user) => {
        return roles.some((role) =>
          user.roles?.map((role) => role.name).includes(role)
        );
      })
    );
  }

  login(email: string, password: string): Observable<LoginResponse> {
    if (!email || !password) {
      throw new Error('Email or password empty');
    }

    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/api/auth/login`,
      { email: email, password: password }
    );
  }

  register(registerDto: RegisterDto) {
    return this.http.post(
      `${environment.apiUrl}/api/auth/register`,
      registerDto
    );
  }

  verifyAccount(email: string, token: string) {
    return this.http.post(`${environment.apiUrl}/api/auth/verify`, {
      email,
      token,
    });
  }

  setToken(value: string) {
    if (this.isBrowser) {
      localStorage.setItem('token', value);
    }
  }

  getRawToken() {
    if (this.isBrowser) {
      return localStorage.getItem('token');
    }
    return '';
  }

  getDecodedToken(): AceJwtPayload | void {
    const token = this.getRawToken();
    if (token) {
      const jwtToken = jwtDecode<AceJwtPayload>(token);
      return jwtToken;
    }
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
    }
  }
}
