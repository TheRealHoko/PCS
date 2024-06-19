import { Component, inject } from '@angular/core';
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
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthStore } from '../stores/auth.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'ace-login',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterOutlet,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  hide: boolean = true;
  snapshot: ActivatedRouteSnapshot;
  authStore = inject(AuthStore);

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly alertService: AlertService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.snapshot = this.activatedRoute.snapshot;
  }

  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    const email_token = this.snapshot.queryParams['token'];

    if (email_token) {
      this.authService.verifyAccount(email, email_token).subscribe({
        complete: () => {
          this.alertService.info('Account verified successfully');
        },
        error: (err: Error) => {
          this.alertService.info(err.message);
          throw new Error(err.message);
        },
      });
    }

    this.authStore.authenticate({ email, password });
  }
}
