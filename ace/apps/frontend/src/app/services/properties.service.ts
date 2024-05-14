import { IProperty } from '@ace/shared';
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

  getProperties(): Observable<IProperty[]> {
    return this.http.get<IProperty[]>(`${environment.apiUrl}/api/properties`);
  }

  getProperty(id: number): Observable<IProperty> {
    return this.http.get<IProperty>(`${environment.apiUrl}/api/properties/${id}`);
  }
}
