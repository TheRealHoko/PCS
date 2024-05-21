import { CreateAvailabilityDto, IAvailability } from '@ace/shared';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvailabilitiesService {

  constructor(private readonly http: HttpClient) { }

  createAvailability(body: CreateAvailabilityDto): Observable<IAvailability> {
    return this.http.post<IAvailability>(`${environment.apiUrl}/api/availabilities`, body);
  }
}
