import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent
  ],
  selector: 'ace-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'PCS';
}
