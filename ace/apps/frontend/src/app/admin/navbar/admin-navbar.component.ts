import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Role } from "../../../../role";
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ace-admin-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule, 
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.sass',
})
export class AdminNavbarComponent {
  public Role = Role;
  public role: Role = Role.ADMIN;
  showFiller = false;
}
