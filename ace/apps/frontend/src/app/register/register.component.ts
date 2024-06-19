import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CustomValidators } from '../shared/custom.validators';
import { AuthService } from '../services/auth.service';
import { MatStepperModule } from '@angular/material/stepper';
import { RegisterDto } from '@ace/shared';
import { AlertService } from '../services/alert.service';
import { UploadComponent } from '../components/upload/upload.component';
import { UploadService } from '../services/upload.service';
import { FileUpload } from '../components/upload/upload.directive';

@Component({
  selector: 'ace-register',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterOutlet,
    MatIconModule,
    MatStepperModule,
    UploadComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword: boolean = true;
  hidePasswordConfirmation: boolean = true;
  profilePicture!: FileUpload;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly alertService: AlertService,
    private readonly uploadService: UploadService
  ) {
    this.registerForm = this.fb.group({
      registerFormArray: this.fb.array([
        this.fb.group({
          firstname: new FormControl('John', [Validators.required]),
          lastname: new FormControl('Smith', [Validators.required]),
          email: new FormControl('john.smith@email.com', [
            Validators.required,
            Validators.email,
          ]),
          phone: new FormControl('0101010101', [Validators.required]),
          password: new FormControl('QQQQqqqq1*', [
            CustomValidators.passwordPolicy(),
          ]),
          confirmPassword: new FormControl('QQQQqqqq1*', [
            CustomValidators.passwordPolicy(),
          ])}),
        this.fb.group({
          address: this.fb.group({
            street_number: new FormControl('1'),
            street_name: new FormControl('rue de la vallée'),
            apartment_number: new FormControl('42'),
            city: new FormControl('Paris'),
            state: new FormControl('Ile de france'),
            postal_code: new FormControl('75012'),
            country: new FormControl('France'),
          }),
        }),
        this.fb.group({
          image: new FormControl(''),
        }),
      ])
    });
  }

  get password() {
    return (this.registerFormArray?.get([0]) as FormGroup).get('password') as FormControl;
  }

  get registerFormArray() {
    return this.registerForm.get('registerFormArray');
  }

  getProfilePicture(files: FileUpload[]) {
    this.profilePicture = files[0];
  }
    
  onRegister() {
    const registerInfo = this.registerForm.getRawValue().registerFormArray;

    // TODO: Change this to validator (if you review please tell me to fix or you fix it idk)
    if (registerInfo[0].password !== registerInfo[0].confirmPassword) {
      this.alertService.info("Password confirmation doesn't match password");
      throw new Error("Password confirmation doesn't match password");
    }

    console.log(registerInfo);
    const registerData: RegisterDto = {...registerInfo[0], ...registerInfo[1]};
    console.log(registerData);

    // Check mail if exists
    // Maybe integrate address trueness check ?
    this.authService.register(registerData)
    .subscribe({
      next: (user) => {
        const formData = new FormData();
        formData.append('file', this.profilePicture?.file);
        formData.append('userId', user.id.toString());
        this.uploadService.uploadProfileImage(formData).subscribe({
          next: () => {
            this.alertService.info('Profile picture uploaded');
          }
        });
      },
      complete: () => {
        this.router.navigateByUrl('/login');
        this.alertService.info(
          `A confirmation mail was sent to ${registerData.email}`
        );
      },
      error: (error) => {
        // Show error msg to user in snackbar ?
        console.error(error);
        this.alertService.info(error.error.message);
      },
    });
  }
}
