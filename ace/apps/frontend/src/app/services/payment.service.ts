import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private readonly http: HttpClient) { }

  checkout(data: { propertyId: number, amount: number }): Observable<{id: string}> {
    return this.http.post<{id: string}>(`${environment.apiUrl}/api/payment/checkout`, data);
  }
}
