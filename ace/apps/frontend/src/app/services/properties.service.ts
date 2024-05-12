import { Property } from '@ace/shared';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${environment.apiUrl}/api/properties`);
  }

  getProperty(id: number): Observable<Property> {
    return this.http.get<Property>(`${environment.apiUrl}/api/properties/${id}`);
  }
}
