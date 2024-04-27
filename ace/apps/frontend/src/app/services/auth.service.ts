import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment';
import { RegisterDto } from "@ace/shared";
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Role } from 'apps/frontend/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated$ = new BehaviorSubject<boolean>(false);
  isAdmin$ = new BehaviorSubject<boolean>(false);

  private isBrowser: boolean;

  constructor(
    private readonly http: HttpClient,
    @Inject(PLATFORM_ID)
    private readonly platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(email: string, password: string) {
    if (!email || !password) {
      throw new Error('Email or password empty');
    }

    return this.http.post<{token: string}>(`${environment.apiUrl}/api/auth/login`, {email: email, password: password});
  }

  register(registerDto: RegisterDto) {
    return this.http.post(`${environment.apiUrl}/api/auth/register`, registerDto);
  }

  verify(email: string, token: string) {
    return this.http.post(`${environment.apiUrl}/api/auth/verify`, { email, token });
  }

  setToken(value: string) {
    if (this.isBrowser) {
      localStorage.setItem('token', value);
    }
  }

  getToken(): JwtPayload | void {
    if (this.isBrowser) {
      const token = localStorage.getItem('token');
      if (token) {
        const jwtToken = jwtDecode(token);
        return jwtToken;
      }
    }
  }

  checkRoles() {

  }
  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      this.isAuthenticated$.next(false);
    }
  }
}
