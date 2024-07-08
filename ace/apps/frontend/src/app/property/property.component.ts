import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { PropertiesService } from '../services/properties.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { CreateBookingDto, IProperty, Property, Service } from '@ace/shared';
import { environment } from '../../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AuthStore } from '../stores/auth.store';
import { ServicesStore } from '../stores/services.store';
import { BookingsService } from '../services/bookings.service';
import { AlertService } from '../services/alert.service';
import { PaymentService } from '../services/payment.service';
import { StripeService } from 'ngx-stripe';

@Component({
  selector: 'ace-property',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    RouterModule
  ],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css',
})
export class PropertyComponent implements OnInit {
  authStore = inject(AuthStore);
  property!: IProperty;
  cdnUrl = environment.cdnUrl;
  minDate: Date;
  maxDate: Date;
  range = new FormGroup({
    from: new FormControl<Date | null>(null),
    to: new FormControl<Date | null>(null),
  });
  dateFilter! : (date: Date) => boolean;
  selectedDaysCount = signal(1);
  price = signal(1);
  computedPrice = computed(() => this.price() * this.selectedDaysCount());
  servicesStore = inject(ServicesStore);
  cart: Service[] = [];

  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly route: ActivatedRoute,
    private readonly bookingsService: BookingsService,
    private readonly alertService: AlertService,
    private readonly paymentService: PaymentService,
    private readonly stripeService: StripeService
  ) {
    this.minDate = new Date(Date.now());
    this.maxDate = new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate());
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
          const id = +params.get('id')!;
          return this.propertiesService.getProperty(id);
        }
      )
    ).subscribe(property => {
      this.property = property;
      this.price.set(property.pricePerNight);
      const unavailableDates = property.propertyUnavailabilities;
      this.dateFilter = (date: Date | null) => {
        if (!date) {
          return false;
        }
        
        const time = date.getTime();
        const isUnavailable = unavailableDates.some(d => {
          const fromTime = new Date(d.from).getTime();
          const toTime = new Date(d.to).getTime();
          return time >= fromTime && time <= toTime;
        });
        return !isUnavailable;
      };
    });

    // bug: able to book between available from one availabilities and to another
    // https://material.angular.io/components/datepicker/overview#customizing-the-date-selection-logic
    // create a selection strategy that only allows dates within the range available dates
  
    this.range.valueChanges.subscribe(val => {
      const from = val.from;
      const to = val.to;
      if (from && to) {
        this.selectedDaysCount.set(this.calculateDaysCount(from, to));
        console.log(from.toISOString(), to.toISOString());
        // this.servicesStore.getFilteredServices({ from, to });
      } else {
        this.selectedDaysCount.set(1);
      }
    });
  }
  
  addServiceToCart(service: Service) {
    this.cart.push(service);
    this.servicesStore.addedToCart(service);
  }

  removeServiceFromCart(service: Service) {
    this.cart = this.cart.filter(s => s.id !== service.id);
  }

  reserveProperty(): void {
    if (this.range.valid) {
      console.log("Reserving property");
      console.log(this.computedPrice());
      const createBookingDto: CreateBookingDto = {
        propertyId: this.property.id,
        from: this.range.value.from as Date,
        to: this.range.value.to as Date,
        travellerId: +this.authStore.token()?.sub!
      };

      this.paymentService.checkoutProperty({ propertyId: this.property.id, amount: this.computedPrice(), serviceIds: this.cart.map(s => s.id)})
        .pipe(
          switchMap(session => {
            console.log(session);
            this.bookingsService.createBooking(createBookingDto).subscribe();
            return this.stripeService.redirectToCheckout({ sessionId: session.id });
          })
        )
        .subscribe(() => {
            this.alertService.info('Property booking successfully!');
          }
        );
    }
    else {
      this.alertService.info('Please select a valid date range!');
    }
  }

  private calculateDaysCount(from: Date, to: Date): number {
    // milliseconds in one day
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round((to.getTime() - from.getTime()) / oneDay) + 1;
  }

}
