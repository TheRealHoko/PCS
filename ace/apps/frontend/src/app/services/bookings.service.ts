import { CreateBookingDto, Booking, UpdateBookingDto, UpdateInterventionDto } from "@ace/shared";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Intervention } from "shared/src/dtos/intervention.dto";

@Injectable({
    providedIn: 'root'
})
export class BookingsService {
  constructor(
    private readonly http: HttpClient,
  ) {}

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${environment.apiUrl}/api/bookings`);
  }

  getBooking(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${environment.apiUrl}/api/bookings/${id}`);
  }

  createBooking(createBookingDto: CreateBookingDto): Observable<Booking> {
    return this.http.post<Booking>(`${environment.apiUrl}/api/bookings`, createBookingDto);
  }

  updateBooking(id: number, updateBookingDto: UpdateBookingDto): Observable<Booking> {
    return this.http.patch<Booking>(`${environment.apiUrl}/api/bookings/${id}`, updateBookingDto);
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/bookings/${id}`);
  }

  updateIntervention(interventionId: number, updateInterventionDTO: UpdateInterventionDto): Observable<Intervention> {
    return this.http.patch<Intervention>(`${environment.apiUrl}/api/bookings/${interventionId}/intervention`, updateInterventionDTO);
  }
}