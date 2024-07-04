import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { PropertiesService } from '../../services/properties.service';
import { Property } from '@ace/shared';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { MatSelectModule } from '@angular/material/select';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AlertService } from '../../services/alert.service';
import { CustomValidators } from '../../shared/custom.validators';

@Component({
  selector: 'ace-property-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    FullCalendarModule,
  ],
  templateUrl: './property-edit.component.html',
  styleUrl: './property-edit.component.css',
})
export class PropertyEditComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  propertiesService = inject(PropertiesService);
  alertService = inject(AlertService);
  property!: Property;
  propTypes = ['HOUSE', 'APARTMENT', 'OFFICE', 'LAND', 'COMMERCIAL'];
  editPropertyForm!: FormGroup;
  calendarOptions!: CalendarOptions;
  
  constructor(
    private readonly fb: FormBuilder,
  ) {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      selectable: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleDateClick.bind(this),
      validRange: {
        start: new Date()
      }
    };
  }
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        const id = +params.get('id')!;
        return this.propertiesService.getProperty(id);
      })
    ).subscribe(property => {
      this.property = property;
      this.editPropertyForm = this.fb.group({
        name: [this.property.name],
        description: [this.property.description],
        pricePerNight: [this.property.pricePerNight, [CustomValidators.numeric, Validators.min(1)]],
        capacity: [this.property.capacity],
        surface: [this.property.surface],
        roomCount: [this.property.roomCount],
        propertyType: [this.property.propertyType]
      });
      this.calendarOptions.events = this.property.propertyUnavailabilities.map(unavailability => {
        return {
          id: unavailability.id.toString(),
          title: 'Unavailable',
          start: unavailability.from,
          end: unavailability.to
        }
      });
      console.log(property);
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
      this.propertiesService.updateProperty(this.property.id, {
        propertyUnavailabilities: [
          ...this.property.propertyUnavailabilities,
          { from, to }
        ]
      }).subscribe(property => {
        this.property = property;
        this.alertService.info('Date added successfully');
      });
    }
  }

  handleDateClick(clickInfo: EventClickArg): void {
    if (confirm('Are you sure you want to remove this date?')) {
      this.propertiesService.updateProperty(this.property.id, {
        propertyUnavailabilities: this.property.propertyUnavailabilities.filter(unavailability => {
          return unavailability.id !== +clickInfo.event.id;
        })
      }).subscribe(property => {
        this.property = property;
        this.alertService.info('Date removed successfully');
      });
      clickInfo.event.remove();
    }
  }
  
  onSubmit(): void {
    if (this.editPropertyForm.invalid) {
      this.alertService.info('Please fill in all required fields');
      return;
    }

    this.propertiesService.updateProperty(this.property.id, this.editPropertyForm.value)
    .subscribe(property => {
      this.property = property;
      this.alertService.info('Property updated successfully');
    });
    console.log(this.editPropertyForm.value);
  }
}
