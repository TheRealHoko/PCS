import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '@ace/shared';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(`${environment.apiUrl}/api/users`);
  }
}
