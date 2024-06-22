import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TicketsService } from '../../services/tickets.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly ticketsService: TicketsService,
    private readonly router: Router,
    private readonly alertsService: AlertService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      topic: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      this.ticketsService.createTicket(this.contactForm.value.topic, this.contactForm.value.description)
      .subscribe(ticket => {
          console.log(ticket);
          this.alertsService.info('Ticket created successfully');
          this.router.navigate(['/support/tickets']);
        }
      );
    }
  }
}