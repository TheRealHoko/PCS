import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

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
  dataSource = USER;
  tableContenu: string[] = ['position', 'firstName', 'lastName', 'age'];
}


// en attendant API GET pour user - m

export interface user {
  position: number;
  firstName: string;
  lastName: string;
  age: number;
}

const USER : user[] = [
  {position: 1, firstName: 'Mehdi', lastName: 'Benchrif', age: 21 },
  {position: 1, firstName: 'Lucas', lastName: 'Defaud', age: 20 },
  {position: 1, firstName: 'Julien', lastName: 'Zeybel', age: 47 }
]


