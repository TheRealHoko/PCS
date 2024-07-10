import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';
import { Property } from '@ace/shared';

@Component({
  selector: 'ace-my-properties',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatMenuModule
  ],
  templateUrl: './my-properties.component.html',
  styleUrl: './my-properties.component.css',
})
export class MyPropertiesComponent {
  usersService = inject(UsersService);
  properties$: Observable<Property[]> = this.usersService.getMyProperties();
  columnsToDiplay = ['name', 'price', 'actions'];

  deleteProperty(id: number) {
    this.usersService.deleteMyProperty(id).subscribe(() => {
      this.properties$ = this.usersService.getMyProperties();
    });
  }

  getProperty(id: number) {
    this.usersService.getMyProperty(id).subscribe((property) => {
      console.log(property);
    });
  }
  
}
