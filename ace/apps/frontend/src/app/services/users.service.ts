import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UpdateUserDto, User } from '@ace/shared';
import { Observable, catchError, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/api/users`);
  }

  getUser(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/api/users/${id}`);
  }

  updateUser(id: number, body: UpdateUserDto) {
    return this.http.patch<User>(`${environment.apiUrl}/api/users/${id}`, body);
  }
  
  deleteUser(id: number) {
    return this.http.delete<User>(`${environment.apiUrl}/api/users/${id}`);
  }
}
