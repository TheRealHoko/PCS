import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Service, UpdateServiceDto } from '@ace/shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private readonly http: HttpClient) { }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${environment.apiUrl}/api/services`);
  }

  getService(id: number): Observable<Service> {
    return this.http.get<Service>(`${environment.apiUrl}/api/services/${id}`);
  }

  validateService(id: number): Observable<Service> {
    return this.http.patch<Service>(`${environment.apiUrl}/api/services/validate/${id}`, null);
  }

  updateService(id: number, body: UpdateServiceDto): Observable<Service> {
    return this.http.patch<Service>(`${environment.apiUrl}/api/services/${id}`, body);
  }

  deleteService(id: number): Observable<Service> {
    return this.http.delete<Service>(`${environment.apiUrl}/api/services/${id}`);
  }
}
