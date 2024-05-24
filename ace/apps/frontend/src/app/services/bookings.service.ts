import { CreateBookingDto, IBooking } from "@ace/shared";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class BookingsService {
  constructor(
    private readonly http: HttpClient,
  ) {}

  getBookings(): Observable<IBooking[]> {
    return this.http.get<IBooking[]>(`${environment.apiUrl}/api/bookings`);
  }

  getBooking(id: string): Observable<IBooking> {
    return this.http.get<IBooking>(`${environment.apiUrl}/api/bookings/${id}`);
  }

  createBooking(createBookingDto: CreateBookingDto): Observable<IBooking> {
    return this.http.post<IBooking>(`${environment.apiUrl}/api/bookings`, createBookingDto);
  }

  updateBooking(booking: IBooking): Observable<IBooking> {
    return this.http.put<IBooking>(`${environment.apiUrl}/api/bookings/${booking.id}`, booking);
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/bookings/${id}`);
  }
}