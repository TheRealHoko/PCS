import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UploadComponent } from '../components/upload/upload.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CreatePropertyDto } from '@ace/shared';
import { UploadService } from '../services/upload.service';
import { FileUpload } from '../components/upload/upload.directive';

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
  ],
  templateUrl: './property-creation.component.html',
  styleUrl: './property-creation.component.css',
})
export class PropertyCreationComponent {
  files: FileUpload[] = [];
  propertyForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    // private readonly propertyStore: PropertyStore,
    private readonly alertService: AlertService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly uploadService: UploadService
  ) {
    this.propertyForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      service_type: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      effectif: ['', [Validators.required, Validators.min(1)]],
      available: [true],
      validated: [false],
    });
  }

  getFiles(files: FileUpload[]) {
    this.files = [...this.files, ...files];
    console.log(this.files);
  }

  onSubmit() {
    if (this.propertyForm.valid) {
      const createPropertyDTO: CreatePropertyDto = this.propertyForm.value;
      const token = this.authService.getDecodedToken();

      const form = new FormData();
      this.files.forEach(file => form.append('files', file.file));
      this.uploadService.uploadPropertyImages(form).subscribe(console.log);

      if (token && token.sub) {
        createPropertyDTO.lessor_id = +token.sub;
      } else {
        this.alertService.info("Couldn't fetch the lessor id");
        throw new Error("Couldn't fetch the lessor id");
      }

    }
  }
}
