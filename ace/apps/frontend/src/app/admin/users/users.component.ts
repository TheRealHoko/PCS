import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { UsersService } from '../../services/users.service';
import { User } from '@ace/shared';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ace-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatExpansionModule,
    MatButtonModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  users!: User[];
  columns = [
    { key: 'id', display: 'ID' },
    { key: 'firstname', display: 'First Name' },
    { key: 'lastname', display: 'Last Name' },
    { key: 'email', display: 'Email' },
    { key: 'phone', display: 'Phone' },
    { key: 'roles', display: 'Roles' },
    { key: 'addresses', display: 'Addresses' }
  ];

  displayedColumns: string[] = [...this.columns.map(c => c.key), 'actions'];

  constructor(private readonly usersService: UsersService) {
    this.usersService.getUsers().subscribe({
      next: (response) => {
        console.log(response);
        this.users = response;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  editRow(row: any) {
    console.log(`editing ${row}`);
  }

  deleteRow(row: any) {
    console.log(`deleting ${row}`);
  }

  isObjectType(value: any): boolean {
    return typeof value === 'object' && value.length !== 0;
  }
}


