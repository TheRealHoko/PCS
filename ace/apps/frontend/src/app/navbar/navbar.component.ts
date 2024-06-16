import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { ReviewComponent } from '../admin/review/review.component';
import { RouterModule } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthStore } from '../stores/auth.store';
import { AccountDropdownComponent } from '../account-dropdown/account-dropdown.component';

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
    RouterModule,
    AccountDropdownComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass',
})
export class NavbarComponent {
  authStore = inject(AuthStore);

  constructor(private readonly alertService: AlertService) {
    this.authStore.refreshRoles();
    
  }

  logout() {
    this.authStore.logout();
    this.alertService.info('Logged out successfully');
  }
}
