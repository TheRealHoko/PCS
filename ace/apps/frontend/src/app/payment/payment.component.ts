import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeElementsDirective, StripePaymentElementComponent, injectStripe } from 'ngx-stripe';
import { StripeElementsOptions } from '@stripe/stripe-js';

@Component({
  selector: 'ace-payment',
  standalone: true,
  imports: [
    CommonModule,
    StripeElementsDirective,
    StripePaymentElementComponent
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  stripe = injectStripe();
  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
