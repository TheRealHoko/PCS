import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesStore } from '../stores/services.store';
import { TableComponent } from '../components/table/table.component';

@Component({
  selector: 'ace-service',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css',
})
export class ServiceComponent implements OnInit {
  readonly servicesStore = inject(ServicesStore);
  columns = [
    { key: 'name', display: 'Name' },
    { key: 'description', display: 'Description' },
    { key: 'available', display: 'Available' },
    { key: 'effectif', display: 'Effectif' },
    { key: 'price', display: 'Price' },
    { key: 'service_type', display: 'Type of the service' },
  ];

  ngOnInit(): void {
    this.servicesStore.refreshServices();
  }
}
