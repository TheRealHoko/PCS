import { Component, EventEmitter, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../services/services.service';
import { IService } from '@ace/shared';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { DateRange, MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FullCalendarModule } from "@fullcalendar/angular";
import { CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { AlertService } from '../../services/alert.service';

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
    MatIconModule,
    FullCalendarModule
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
  calendarOptions = signal<CalendarOptions>({
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    selectable: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleDateClick.bind(this),
    validRange: {
      start: new Date()
    }
  });
  alertService = inject(AlertService);

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
  }

  ngOnInit(): void {
    this.addAvailability();
    this.route.paramMap.pipe(
      switchMap(params => {
          const id = +params.get('id')!;
          return this.servicesService.getService(id);
        }
      )
    ).subscribe(service => {
      this.service = service;
      this.calendarOptions.update((x) => {
        return {
          ...x,
          events: this.service.availabilities.map(availability => {
            return {
              title: 'Available',
              id: availability.id.toString(),
              start: availability.from,
              end: availability.to,
            };
          })
        }
      });
      
      console.log(this.service);

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

  handleDateSelect(selectInfo: DateSelectArg): void {
    const from = selectInfo.start;
    const to = selectInfo.end;
    const calendarApi = selectInfo.view.calendar;

    if (from < to) {
      console.log(from, to);
      calendarApi.addEvent({
        title: 'Unavailable',
        start: from,
        end: to
      });
      this.servicesService.updateService(this.service.id, {
        availabilities: [
          ...this.service.availabilities,
          { from, to }
        ]
      }).subscribe(service => {
        this.service = service;
        this.alertService.info('Date added successfully');
      });
    }
  }

  handleDateClick(clickInfo: EventClickArg): void {
    if (confirm('Are you sure you want to remove this date?')) {
      this.servicesService.updateService(this.service.id, {
        availabilities: this.service.availabilities.filter(availability => {
          return availability.id !== +clickInfo.event.id;
        })
      }).subscribe(service => {
        this.service = service;
        this.alertService.info('Date removed successfully');
      });
      clickInfo.event.remove();
    }
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
      this.servicesService.updateService(this.service.id, {
          availabilities: this.availabilitiesForm.value.availabilities
        }
      ).subscribe(
        service => {
          this.service = service;
        }
      );
      console.log(this.availabilitiesForm.value);
    }
  }
}
