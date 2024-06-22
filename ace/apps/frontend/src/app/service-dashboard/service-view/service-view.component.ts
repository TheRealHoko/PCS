import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../services/services.service';
import { IService } from '@ace/shared';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { DateRange, DefaultMatCalendarRangeStrategy, MatDatepickerModule, MatRangeDateSelectionModel } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ace-service-view',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule
  ],
  templateUrl: './service-view.component.html',
  styleUrl: './service-view.component.css',
})
export class ServiceViewComponent implements OnInit {
  service!: IService;
  selectedDateRange: DateRange<Date> | undefined;
  minDate: Date;
  maxDate: Date;
  availabilitiesForm: FormGroup;
  availableDates: Date[] = [];
  isDateDisabled = (date: Date) =>!this.availableDates.includes(date);

  constructor(
    private readonly servicesService: ServicesService,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder
  ) {
    this.minDate = new Date(Date.now());
    this.maxDate = new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate());
    this.availabilitiesForm = this.fb.group({
      availabilities: this.fb.array([])
    });
    this.addAvailability();
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
          const id = +params.get('id')!;
          return this.servicesService.getService(id);
        }
      )
    ).subscribe(service => {
      this.service = service;
      this.availabilities().controls.forEach(availability => {
        const from = availability.get('from')!.value;
        const to = availability.get('to')!.value;
        if (from && to) {
          for (let date = from; date <= to; date.setDate(date.getDate() + 1)) {
            this.availableDates.push(new Date(date));
          }
        }
      });
    });
  }

  availabilities(): FormArray {
    return this.availabilitiesForm.get('availabilities') as FormArray;
  }

  addAvailability() {
    this.availabilities().push(
      this.fb.group({
        from: [null, [Validators.required]],
        to: [null, [Validators.required]]
      })
    );
  }

  removeAvailability(index: number): void {
    this.availabilities().removeAt(index);
  }

  onSubmit() {
    if (this.availabilitiesForm.valid) {
      console.log(this.availabilitiesForm.value);
    }
  }
}