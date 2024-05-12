import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UsersService } from '../services/users.service';
import { User } from '@ace/shared';
import { RoleEnum } from '@ace/shared';

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
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  hide: boolean = true;
  snapshot: ActivatedRouteSnapshot;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly alertService: AlertService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly usersService: UsersService
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });

    this.snapshot = this.activatedRoute.snapshot;
  }

  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  onLogin() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    const email_token = this.snapshot.queryParams['token'];

    if (email_token) {
      this.authService.verify(email, email_token).subscribe({
        complete: () => {
          this.alertService.info('Account verified successfully');
        },
        error: (err: Error) => {
          this.alertService.info(err.message);
          throw new Error(err.message);
        }
      });
    }

    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.authService.setToken(response.token)
        const token = this.authService.getToken();
        if (token && token.sub) {
          this.usersService.getUser(+token.sub).subscribe({
            next: (user: User) => {
              console.log(user);
              if (user.roles) {
                this.authService.isAdmin$.next(!!user.roles.find(role => role.name == RoleEnum.ADMIN))
              }
            }
          });
        }
        this.alertService.info('Logged in successfully');
        this.router.navigateByUrl('/home');
      }
    });
  }
}
