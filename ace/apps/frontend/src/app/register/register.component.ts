import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
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
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword: boolean = true;
  hidePasswordConfirmation: boolean = true;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly alertService: AlertService
  ) {
    this.registerForm = this.fb.group({
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
      ]),
      address: this.fb.group({
        street_number: new FormControl('1'),
        street_name: new FormControl('rue de la vallée'),
        apartment_number: new FormControl('42'),
        city: new FormControl('Paris'),
        state: new FormControl('Ile de france'),
        postal_code: new FormControl('75012'),
        country: new FormControl('France'),
      }),
    });
  }

  get password() {
    return this.registerForm.get('password') as FormControl;
  }

  onRegister() {
    const registerInfo = this.registerForm.getRawValue();

    // TODO: Change this to validator (if you review please tell me to fix or you fix it idk)
    if (registerInfo.password !== registerInfo.confirmPassword) {
      this.alertService.info("Password confirmation doesn't match password");
      throw new Error("Password confirmation doesn't match password");
    }

    const registerData: RegisterDto = registerInfo;
    // Check mail if exists
    // Maybe integrate address trueness check ?
    this.authService.register(registerData).subscribe({
      next: () => {},
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
