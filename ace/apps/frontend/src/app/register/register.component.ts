import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CustomValidators } from '../shared/custom.validators';
import { AuthService } from '../services/auth.service';
import { MatStepperModule } from "@angular/material/stepper";

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
    MatStepperModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.registerForm = this.fb.group({
      firstname: new FormControl('', [
        Validators.required
      ]),
      lastname: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        CustomValidators.passwordPolicy()
      ]),
      confirmPassword: new FormControl('', [
        CustomValidators.passwordPolicy()
      ]),
      address: this.fb.group({
        street_number: new FormControl(''),
        street_name: new FormControl(''),
        apartment_number: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        postal_code: new FormControl(''),
        country: new FormControl(''),
      })
    });
  }

  onRegister() {
    const registerInfo = this.registerForm.value;
    console.log(registerInfo);
    // this.authService.register()
  }
}
