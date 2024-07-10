import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Property, UpdateUserDto, User } from '@ace/shared';
import { Observable, catchError, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private endpoint = `${environment.apiUrl}/api/users`;
  constructor(private readonly http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.endpoint}`);
  }

  getUser(id: number) {
    return this.http.get<User>(`${this.endpoint}/${id}`);
  }

  updateUser(id: number, body: UpdateUserDto) {
    return this.http.patch<User>(`${this.endpoint}/${id}`, body);
  }

  deleteUser(id: number) {
    return this.http.delete<User>(`${this.endpoint}/${id}`);
  }

  getMyProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.endpoint}/my-properties`);
  }

  getMyProperty(id: number): Observable<Property> {
    return this.http.get<Property>(`${this.endpoint}/my-properties/${id}`);
  }

  deleteMyProperty(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/my-properties/${id}`);
  }
}
