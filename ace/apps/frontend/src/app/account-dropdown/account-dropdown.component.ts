import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthStore } from '../stores/auth.store';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'ace-account-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './account-dropdown.component.html',
  styleUrl: './account-dropdown.component.css',
})
export class AccountDropdownComponent {
  authStore = inject(AuthStore);

  constructor(
    private readonly alertService: AlertService
  ) {}
  
  logout() {
    this.authStore.logout();
    this.alertService.info('Logged out successfully');
  }
}
