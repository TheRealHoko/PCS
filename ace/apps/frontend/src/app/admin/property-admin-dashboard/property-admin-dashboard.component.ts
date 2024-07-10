import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesStore } from '../../stores/properties.store';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AlertService } from '../../services/alert.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'ace-property-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    TableComponent,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule
  ],
  templateUrl: './property-admin-dashboard.component.html',
  styleUrl: './property-admin-dashboard.component.css',
})
export class PropertyAdminDashboardComponent {
  readonly propertiesStore = inject(PropertiesStore);
  columns = [
    { key: 'id', display: 'ID' },
    { key: 'name', display: 'Name' },
    { key: 'description', display: 'Description' },
    { key: 'pricePerNight', display: 'Price' },
    { key: 'capacity', display: 'Capacity' },
    { key: 'surface', display: 'Surface' },
    { key: 'roomCount', display: 'Room Count' },
    { key: 'propertyType', display: 'Property Type' },
    { key: 'lessor', display: 'Lessor' },
];

  constructor(
    private readonly alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.propertiesStore.refreshProperties();
  }

  validateProperty(row: { name: string; id: number }) {
    this.propertiesStore.validateProperty(row.id);
    // Put user mail in snackbar
    this.alertService.info(
      `Property ${row.name} (${row.id}) was validated, an email was sent to the user`
    );
  }

  invalidateProperty(row: { name: string; id: number }) {
    const invalidatedProperty = this.propertiesStore.invalidateProperty(row.id);
    console.log(invalidatedProperty);
    // Put user mail in snackbar
    this.alertService.info(
      `Property ${row.name} (${row.id}) was refused, an email was sent to the user`
    );
  }

  deleteRow(row: { name: string; id: number }) {
    this.propertiesStore.deleteProperty(row.id);
    this.alertService.info(`Property ${row.name} (${row.id}) was deleted`);
  }
}
