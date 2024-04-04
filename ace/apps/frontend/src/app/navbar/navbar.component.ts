import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { Role } from "../../../role";
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'ace-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass',
})
export class NavbarComponent {
  public Role = Role;
  public role: Role = Role.USER;
  showFiller = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly alertService: AlertService
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
    this.alertService.info("Logged out successfully");
  }
}

