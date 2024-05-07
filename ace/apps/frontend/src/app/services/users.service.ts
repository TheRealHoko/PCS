import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '@ace/shared';
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
    return this.http.get<User>(`${environment.apiUrl}/api/users/${id}`).pipe(
      take(1),
      catchError(error => {
        console.error('Error fetching user :', error);
        throw error;
      })
    );
  }

  deleteUser(id: number) {
    return this.http.delete(`${environment.apiUrl}/api/users/${id}`);
  }
}
