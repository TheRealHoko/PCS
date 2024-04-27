import { AfterRenderPhase, Component, OnInit, afterNextRender, computed, effect, signal } from '@angular/core';
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
export class NavbarComponent {
  isAuthenticated$ = this.authService.isAuthenticated$;
  isAdmin$ = this.authService.isAdmin$;
  
  showFiller = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly alertService: AlertService,
  ) {
    this.isAuthenticated$.subscribe((val) => console.log(`isAuth: ${val}`));
  }

  logout() {
    this.isAdmin$.next(false);
    this.authService.logout();
    this.router.navigateByUrl('/login');
    this.alertService.info("Logged out successfully");
  }
}

