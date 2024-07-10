import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingsService } from '../services/bookings.service';
import { Booking } from '@ace/shared';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ace-bookings',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css',
})
export class BookingsComponent implements OnInit {
  bookings: Booking[] = [];

  constructor(
    private readonly bookingsService: BookingsService,
  ) {}

  ngOnInit(): void {
    this.bookingsService.getBookings().subscribe(bookings => {
      this.bookings = bookings;
    });
  }

  cancelBooking(booking: Booking): void {
    this.bookingsService.deleteBooking(booking.id).subscribe(() => {
      this.bookings = this.bookings.filter(b => b.id !== booking.id);
    });
  }

}
