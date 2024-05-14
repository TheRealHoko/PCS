import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UpdateUserDto, IUser } from '@ace/shared';
import { Observable, catchError, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private readonly http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${environment.apiUrl}/api/users`);
  }

  getUser(id: number) {
    return this.http.get<IUser>(`${environment.apiUrl}/api/users/${id}`);
  }

  updateUser(id: number, body: UpdateUserDto) {
    return this.http.patch<IUser>(`${environment.apiUrl}/api/users/${id}`, body);
  }

  deleteUser(id: number) {
    return this.http.delete<IUser>(`${environment.apiUrl}/api/users/${id}`);
  }
}
