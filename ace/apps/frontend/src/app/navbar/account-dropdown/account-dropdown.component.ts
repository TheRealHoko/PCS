import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthStore } from '../../stores/auth.store';
import { AlertService } from '../../services/alert.service';
import { UsersService } from '../../services/users.service';
import { environment } from '../../../environments/environment';

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
  usersService = inject(UsersService);
  cdnUrl: string = environment.cdnUrl;
  profilePictureUrl: string = "";

  constructor(
    private readonly alertService: AlertService
  ) {
    this.usersService.getUser(+this.authStore.token()?.sub!).subscribe((user) => {
      if (user.profile_picture) {
        this.profilePictureUrl = this.cdnUrl + '/' + user.profile_picture.path;
      }
    });
  }
  
  logout() {
    this.authStore.logout();
    this.alertService.info('Logged out successfully');
  }
}
