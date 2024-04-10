import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { ReviewComponent } from '../admin/review/review.component';
import { Router, RouterModule } from '@angular/router';
import { Role } from "../../../role";
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { JwtPayload, jwtDecode } from "jwt-decode";
import { UsersService } from '../services/users.service';
import { User } from '@ace/shared';
import { BehaviorSubject } from 'rxjs';

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
export class NavbarComponent implements OnInit {
  public isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showFiller = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly alertService: AlertService,
    private readonly usersService: UsersService
  ) {}

  ngOnInit(): void {
    const token = this.extractJWT()
    if (token && token.sub) {
      console.log(token);
      this.usersService.getUser(+token.sub).subscribe({
        next: (user: User) => {
          console.log(user);
          if (user.roles) {
            this.isAdmin.next(!!user.roles.find(role => role.name == Role.ADMIN));
            console.log(`isAdmin : ${this.isAdmin}`);
          }
        }
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
    this.alertService.info("Logged out successfully");
  }

  extractJWT(): JwtPayload | void {
    const token = localStorage.getItem('token');
    if (token) {
      const jwtToken = jwtDecode(token);
      return jwtToken;
    }
  }
}

