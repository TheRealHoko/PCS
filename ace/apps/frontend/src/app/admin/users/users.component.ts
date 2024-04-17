import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { UsersService } from '../../services/users.service';
import { User } from '@ace/shared';
import { MatButtonModule } from '@angular/material/button';
import { TableComponent } from '../../table/table.component';

@Component({
  selector: 'ace-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatExpansionModule,
    MatButtonModule,
    TableComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  users = this.usersService.getUsers();
  columns = [
    { key: 'id', display: 'ID' },
    { key: 'firstname', display: 'First Name' },
    { key: 'lastname', display: 'Last Name' },
    { key: 'email', display: 'Email' },
    { key: 'phone', display: 'Phone' },
    { key: 'roles', display: 'Roles' },
    { key: 'addresses', display: 'Addresses' }
  ];

  constructor(
    private readonly usersService: UsersService
  ) {}

}


