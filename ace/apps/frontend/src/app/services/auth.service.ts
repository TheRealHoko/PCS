import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RegisterDto } from "@ace/shared";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

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

  logout() {
    localStorage.removeItem('token');
  }
}
