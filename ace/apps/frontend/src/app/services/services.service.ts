import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CreateServiceDto } from '@ace/shared';
import { Service } from '@ace/shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private readonly http:HttpClient) { }

  getServices() {
    return this.http.get(`${environment.apiUrl}/api/services`) 
  }

  createServices(createServiceDto: CreateServiceDto) {
    return this.http.post(`${environment.apiUrl}/api/services`,createServiceDto)

  }
}
