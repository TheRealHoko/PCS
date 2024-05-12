import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { UsersService } from '../../services/users.service';
import { MatButtonModule } from '@angular/material/button';
import { TableComponent } from '../../components/table/table.component';
import { AlertService } from '../../services/alert.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UsersStore } from '../../stores/users.store';

@Component({
  selector: 'ace-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatExpansionModule,
    MatButtonModule,
    TableComponent,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit{
  readonly usersStore = inject(UsersStore);

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
    private readonly alertService: AlertService
  ) {}
  
  ngOnInit(): void {
    this.usersStore.refreshUsers();
  }

  editRow(row: {id: number}) {
    console.log(JSON.stringify(row.id))
  }

  deleteRow(row: {name: string, id: number}) {
    this.usersStore.deleteUser(row.id);
    this.alertService.info(`User ${row.name} (${row.id}) was deleted`)
  }
}


