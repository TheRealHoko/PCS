import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ReviewComponent } from '../admin/review/review.component';
import { Role } from "../../../role";

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
  public Role = Role;
  public role: Role = Role.ADMIN;
  showFiller = false;
}

