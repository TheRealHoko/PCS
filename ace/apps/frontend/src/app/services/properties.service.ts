import { CreatePropertyDto, IProperty } from '@ace/shared';
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

  createProperty(createPropertyDto: CreatePropertyDto): Observable<IProperty> {
    return this.http.post<IProperty>(`${environment.apiUrl}/api/properties`, createPropertyDto);
  }
  
  getProperties(): Observable<IProperty[]> {
    return this.http.get<IProperty[]>(`${environment.apiUrl}/api/properties`);
  }

  getProperty(id: number): Observable<IProperty> {
    return this.http.get<IProperty>(`${environment.apiUrl}/api/properties/${id}`);
  }
}
