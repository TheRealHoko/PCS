import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UploadComponent } from '../components/upload/upload.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { CreatePropertyDto, Property } from '@ace/shared';
import { UploadService } from '../services/upload.service';
import { FileUpload } from '../components/upload/upload.directive';
import { MatSelectModule } from '@angular/material/select';
import { PropertiesService } from '../services/properties.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthStore } from '../stores/auth.store';

@Component({
  selector: 'ace-property-creation',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    UploadComponent,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule
  ],
  templateUrl: './property-creation.component.html',
  styleUrl: './property-creation.component.css',
})
export class PropertyCreationComponent {
  files: FileUpload[] = [];
  propertyForm: FormGroup;
  propTypes = ['HOUSE', 'APARTMENT', 'OFFICE', 'LAND', 'COMMERCIAL'];
  minDate: Date;
  maxDate: Date;
  authStore = inject(AuthStore);

  constructor(
    private readonly fb: FormBuilder,
    private readonly propertiesService: PropertiesService,
    private readonly alertService: AlertService,
    private readonly authService: AuthService,
    private readonly uploadService: UploadService,
    private readonly router: Router
  ) {
    this.minDate = new Date(Date.now());
    this.maxDate = new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate());
    this.propertyForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      propertyType: ['', Validators.required],
      pricePerNight: ['', [Validators.required, Validators.min(0)]],
      capacity: ['', [Validators.required, Validators.min(1)]],
      surface: ['', [Validators.required, Validators.min(1)]],
      roomCount: ['', [Validators.required, Validators.min(1)]],
    });
  }

  getFiles(files: FileUpload[]) {
    this.files = [...this.files, ...files];
    console.log(this.files);
  }

  onSubmit() {
    if (this.propertyForm.valid) {
      console.log(this.propertyForm.value);
      const createPropertyDTO: CreatePropertyDto = this.propertyForm.value;
      const token = this.authService.getDecodedToken();
      
      if (token && token.sub) {
        createPropertyDTO.lessorId = +token.sub;
      } else {
        this.alertService.info("Couldn't fetch the lessor id");
        throw new Error("Couldn't fetch the lessor id");
      }
      
      this.propertiesService.createProperty(createPropertyDTO).subscribe({
        next: (property: Property) => {
          const form = new FormData();
          this.files.map(file => form.append('files', file.file));
          form.append('propertyId', property.id.toString());
          this.uploadService.uploadPropertyImages(form).subscribe(console.log);
          this.alertService.info('Property submitted successfully');
          this.router.navigateByUrl('/');
        },
        error: () => this.alertService.info('An error occurred while creating the property')
      });
    }
  }
}
