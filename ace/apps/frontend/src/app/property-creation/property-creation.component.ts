import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UploadComponent } from '../components/upload/upload.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { CreateAvailabilityDto, CreatePropertyDto, IProperty } from '@ace/shared';
import { UploadService } from '../services/upload.service';
import { FileUpload } from '../components/upload/upload.directive';
import { MatSelectModule } from '@angular/material/select';
import { PropertiesService } from '../services/properties.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';

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

  constructor(
    private readonly fb: FormBuilder,
    private readonly propertiesService: PropertiesService,
    private readonly alertService: AlertService,
    private readonly authService: AuthService,
    private readonly uploadService: UploadService,
  ) {
    this.minDate = new Date(Date.now());
    this.maxDate = new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate());
    this.propertyForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      propertyType: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      capacity: ['', [Validators.required, Validators.min(1)]],
      surface: ['', [Validators.required, Validators.min(1)]],
      roomCount: ['', [Validators.required, Validators.min(1)]],
      availabilities: this.fb.array([])
    });

    this.addAvailability();
  }

  getFiles(files: FileUpload[]) {
    this.files = [...this.files, ...files];
    console.log(this.files);
  }

  availabilities(): FormArray {
    return this.propertyForm.get('availabilities') as FormArray;
  }

  addAvailability() {
    this.availabilities().push(
      this.fb.group({
        from: [this.fb.control<Date | null>(null), [Validators.required]],
        to: [this.fb.control<Date | null>(null), [Validators.required]]
      })
    );
  }

  removeAvailability(index: number): void {
    this.availabilities().removeAt(index);
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
        next: (property: IProperty) => {
          const form = new FormData();
          this.files.map(file => form.append('files', file.file));
          form.append('propertyId', property.id.toString());
          this.uploadService.uploadPropertyImages(form).subscribe(console.log);
          this.alertService.info('Property created successfully');
        },
        error: () => this.alertService.info('An error occurred while creating the property')
      });
    }
  }
}
