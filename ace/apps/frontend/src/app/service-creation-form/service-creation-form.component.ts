import { ChangeDetectionStrategy, Component, effect, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ServicesService } from '../services/services.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { CreateServiceDto } from '@ace/shared';
import { AuthService } from '../services/auth.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'ace-service',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  templateUrl: './service-creation-form.component.html',
  styleUrls: ['./service-creation-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceCreationFormComponent {
  serviceForm: FormGroup;
  serviceTypes = ['ESSENTIAL', 'OPTIONAL'];
  serviceCategories = [
    'ESSENTIAL_PROPERTY_MANAGEMENT',
    'ESSENTIAL_MAINTENANCE_REPAIR',
    'MARKETING_COMMUNICATION',
    'FINANCIAL_OPTIMIZATION',
    'TRANSPORT',
    'CONCIERGE',
    'OTHER',
  ];
  pricingTypes = [
    'FIXED',
    'PER_KM',
    'PER_HOUR',
    'PER_DAY',
    'PER_WEEK',
    'PER_MONTH',
    'PER_YEAR',
  ];
  selectedPricingType = signal('');

  constructor(
    private readonly fb: FormBuilder,
    private readonly servicesService: ServicesService,
    private readonly alertService: AlertService,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      service_type: ['', Validators.required],
      base_price: ['', [Validators.required, Validators.min(0)]],
      pricing_type: ['', Validators.required],
      service_category: ['', Validators.required],
      dynamic_price: [null],
      available: [true],
      status: ['WAITING'],
    });

    effect(() => console.log(this.selectedPricingType()))
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      const createServiceDTO: CreateServiceDto = this.serviceForm.value;
      const token = this.authService.getDecodedToken();

      if (token && token.sub) {
        createServiceDTO.providerId = +token.sub;
      } else {
        this.alertService.info("Couldn't fetch the provider id");
        throw new Error("Couldn't fetch the provider id");
      }

      this.servicesService.createServices(createServiceDTO).subscribe({
        next: () => {
          this.alertService.info('Demande de création de service envoyé');
          this.router.navigateByUrl('/');
        },
        error: (err: Error) => {
          this.alertService.info(
            'Erreur lors de la création du service : ' + err.message
          );
        },
      });
    } else {
      this.alertService.info('Veuillez remplir tous les champs requis');
    }
  }
}
