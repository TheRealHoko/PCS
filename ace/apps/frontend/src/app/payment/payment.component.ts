import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeElementsDirective, StripePaymentElementComponent, StripeService } from 'ngx-stripe';
import { ActivatedRoute, Params } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { AuthStore } from '../stores/auth.store';
import { UsersService } from '../services/users.service';
import { User } from '@ace/shared';
import { map } from 'rxjs';
import { BookingsService } from '../services/bookings.service';

@Component({
  selector: 'ace-payment',
  standalone: true,
  imports: [
    CommonModule,
    StripeElementsDirective,
    StripePaymentElementComponent,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  params: Params = [];
  auth = inject(AuthStore);
  user: User | undefined = undefined;
  bookingsService = inject(BookingsService);

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly paymentService: PaymentService,
    private readonly usersService: UsersService,
  ) { 
    this.usersService.getUser(+this.auth.token()?.sub!)
      .pipe(
        map((user: User) => this.user = user)
      ).subscribe();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.params = params
      console.log(params);
      if (params['sessionId'] && params['userId']) {
        this.paymentService.success({ sessionId: params['sessionId'], userId: params['userId'] })
          .subscribe({
            next: data => {
              console.log(data);
              this.bookingsService.updateBooking(+data.session.metadata.bookingId, { status: 'confirmed' }).subscribe(console.log);
            }
          });
      }
    });
  }
}
