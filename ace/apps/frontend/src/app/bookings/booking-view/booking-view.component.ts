import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBooking, Service } from '@ace/shared';
import { ServicesService } from '../../services/services.service';
import { BookingsService } from '../../services/bookings.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'ace-booking-view',
  standalone: true,
  imports: [
    CommonModule,

  ],
  templateUrl: './booking-view.component.html',
  styleUrl: './booking-view.component.css',
})
export class BookingViewComponent implements OnInit {
  booking!: IBooking;
  bookingService = inject(BookingsService);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      switchMap(params => {
          const id = +params.get('id')!;
          return this.bookingService.getBooking(id);
        }
      )
    ).subscribe(booking => {
      this.booking = booking;
    });
  }
}
