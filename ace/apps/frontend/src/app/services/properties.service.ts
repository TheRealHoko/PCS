import { CreatePropertyDto, Property, UpdatePropertyDto } from '@ace/shared';
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

  createProperty(createPropertyDto: CreatePropertyDto): Observable<Property> {
    return this.http.post<Property>(`${environment.apiUrl}/api/properties`, createPropertyDto);
  }
  
  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${environment.apiUrl}/api/properties`);
  }

  getProperty(id: number): Observable<Property> {
    return this.http.get<Property>(`${environment.apiUrl}/api/properties/${id}`);
  }

  updateProperty(id: number, UpdatePropertyDto: UpdatePropertyDto): Observable<Property> {
    return this.http.patch<Property>(`${environment.apiUrl}/api/properties/${id}`, UpdatePropertyDto);
  }

  deleteProperty(id: number): Observable<Property> {
    return this.http.delete<Property>(`${environment.apiUrl}/api/properties/${id}`);
  }

  validateProperty(id: number): Observable<Property> {
    return this.http.patch<Property>(`${environment.apiUrl}/api/properties/validate/${id}`, {});
  }

  invalidateProperty(id: number): Observable<Property> {
    return this.http.patch<Property>(`${environment.apiUrl}/api/properties/validate/${id}`, {});
  }
}
