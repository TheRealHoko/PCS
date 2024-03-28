import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    if (!email || !password) {
      throw new Error('Email or password empty');
    }

    return this.http.post<{token: string}>(`${environment.apiUrl}/api/auth/login`, {email: email, password: password});
  }
}
