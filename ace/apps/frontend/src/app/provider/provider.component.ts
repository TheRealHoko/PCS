import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { ServicesService } from '../services/services.service'; // Assurez-vous d'avoir ce service
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ace-service',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css'],
})
export class ProviderComponent {
  serviceForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly servicesService: ServicesService,
    private readonly alertService: AlertService,
    private readonly router: Router
  ) {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      service_type: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      effectif: ['', [Validators.required, Validators.min(1)]],
      available: [true],
      validated: [false]
    });
  }

  onCreateService() {
    if (this.serviceForm.valid) {
      this.servicesService.createServices(this.serviceForm.value).subscribe({
        next: () => {
          this.alertService.info('Service créé avec succès');
          this.router.navigateByUrl('/dashboard'); // Assurez-vous que cette route existe
        },
        error: (err: Error) => {
          this.alertService.info('Erreur lors de la création du service : ' + err.message);
        }
      });
    } else {
      this.alertService.info('Veuillez remplir tous les champs requis');
    }
  }
}
