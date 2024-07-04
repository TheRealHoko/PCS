import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private readonly http: HttpClient) { }

  checkoutProperty(data: { propertyId: number, amount: number, serviceIds: number[] }): Observable<{id: string}> {
    return this.http.post<{id: string}>(`${environment.apiUrl}/api/payment/checkout`, data);
  }

  success(data: { sessionId: string, userId: number }): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/payment/success`, data);
  }

  cancel(data: { sessionId: string, userId: number }): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/payment/cancel`, data);
  }
}
