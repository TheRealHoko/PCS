import { HttpClient } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { toSignal } from "@angular/core/rxjs-interop";
import { environment } from '../../environments/environment';
import { User } from '@ace/shared';
import { catchError, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly http: HttpClient) {}

  getUsers(): Signal<User[] | any> {
    const user = this.http.get<User[]>(`${environment.apiUrl}/api/users`);
    return toSignal(user, {initialValue: null});
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
}
