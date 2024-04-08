import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { UsersService } from '../../services/users.service';
import { User } from '@ace/shared';

@Component({
  selector: 'ace-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  users!: User[];
  columns: string[] = [];

  constructor(private readonly usersService: UsersService) {
    this.usersService.getUsers().subscribe({
      next: (response) => {
        console.log(response);
        this.columns = Object.keys(response[0]);
        console.log(this.columns);
        this.users = response;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}


