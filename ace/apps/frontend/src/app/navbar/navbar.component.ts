import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { ReviewComponent } from '../admin/review/review.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { Role } from 'apps/frontend/role';

@Component({
  selector: 'ace-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    ReviewComponent,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass',
})
export class NavbarComponent {
  isLoggedIn$ = this.authService.isLoggedIn$;
  isAdmin$ = this.authService.isAdmin$;

  constructor(
    private readonly authService: AuthService,
    private readonly alertService: AlertService,
  ) {
    this.authService.isLoggedIn$.next(this.authService.isLoggedIn());
    this.authService.hasRoles([Role.ADMIN]).subscribe(hasRole => {
      if (hasRole) {
        this.isAdmin$.next(true);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.alertService.info("Logged out successfully");
  }
}

