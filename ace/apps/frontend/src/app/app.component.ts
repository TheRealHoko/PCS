import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
    AdminNavbarComponent
  ],
  selector: 'ace-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'PCS';
}
