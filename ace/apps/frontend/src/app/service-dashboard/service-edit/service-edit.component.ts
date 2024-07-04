import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Property, Service } from '@ace/shared';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { CustomValidators } from '../../shared/custom.validators';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'ace-service-edit',
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
  ],
  templateUrl: './service-edit.component.html',
  styleUrl: './service-edit.component.css',
})
export class ServiceEditComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  servicesService = inject(ServicesService);
  alertService = inject(AlertService);
  service!: Service;
  editServiceForm!: FormGroup;
  
  constructor(
    private readonly fb: FormBuilder,
  ) {}
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        const id = +params.get('id')!;
        return this.servicesService.getService(id);
      })
    ).subscribe(service => {
      this.service = service;
      this.editServiceForm = this.fb.group({
        name: [this.service.name],
        description: [this.service.description],
        price: [this.service.price, [CustomValidators.numeric, Validators.min(1)]],
      });
      console.log(service);
    });
  }

  onSubmit(): void {
    if (this.editServiceForm.invalid) {
      this.alertService.info('Please fill in all required fields');
      return;
    }

    this.servicesService.updateService(this.service.id, this.editServiceForm.value)
    .subscribe(service => {
      this.service = service;
      this.alertService.info('Service updated successfully');
    });
    console.log(this.editServiceForm.value);
  }
}{}
