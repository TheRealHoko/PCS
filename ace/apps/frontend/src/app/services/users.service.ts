import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UpdateUserDto, IUser, IProperty } from '@ace/shared';
import { Observable, catchError, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private endpoint = `${environment.apiUrl}/api/users`;
  constructor(private readonly http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.endpoint}`);
  }

  getUser(id: number) {
    return this.http.get<IUser>(`${this.endpoint}/${id}`);
  }

  updateUser(id: number, body: UpdateUserDto) {
    return this.http.patch<IUser>(`${this.endpoint}/${id}`, body);
  }

  deleteUser(id: number) {
    return this.http.delete<IUser>(`${this.endpoint}/${id}`);
  }

  getMyProperties(): Observable<IProperty[]> {
    return this.http.get<IProperty[]>(`${this.endpoint}/my-properties`);
  }

  getMyProperty(id: number): Observable<IProperty> {
    return this.http.get<IProperty>(`${this.endpoint}/my-properties/${id}`);
  }

  deleteMyProperty(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/my-properties/${id}`);
  }
}
