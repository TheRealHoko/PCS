import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { ServicesService } from '../../services/services.service';
import { TableComponent } from '../../table/table.component';

@Component({
  selector: 'ace-provider',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    TableComponent
  ],
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.css',
})
export class ProviderComponent {
  services = this.servicesService.getServices();
  columns = [
    { key: 'id', display: 'ID' },
    { key: 'name', display: 'Name' },
    { key: 'description', display: 'Description' },
    { key: 'available', display: 'Available' },
    { key: 'validated', display: 'Validated' },
    { key: 'effectif', display: 'Effectif' },
    { key: 'price', display: 'Price' },
    { key: 'service_type', display: 'Type of the service' }
  ];

  constructor(
    private readonly servicesService: ServicesService
  ) {}

}