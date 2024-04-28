import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Service } from '@ace/shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private readonly http: HttpClient) { }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${environment.apiUrl}/api/services`);
  }
}
