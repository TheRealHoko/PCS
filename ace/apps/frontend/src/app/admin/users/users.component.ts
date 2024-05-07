import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { UsersService } from '../../services/users.service';
import { MatButtonModule } from '@angular/material/button';
import { TableComponent } from '../../components/table/table.component';
import { AlertService } from '../../services/alert.service';

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
    private readonly usersService: UsersService,
    private readonly alertService: AlertService
  ) {}

  editRow(row: {id: number}) {
    console.log(JSON.stringify(row.id))
  }

  deleteRow(row: {name: string, id: number}) {
    this.usersService.deleteUser(row.id).subscribe(console.log);
    this.alertService.info(`User ${row.name} (${row.id}) was deleted`)
  }
}


