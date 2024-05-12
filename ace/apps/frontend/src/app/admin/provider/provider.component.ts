import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ServicesService } from '../../services/services.service';
import { TableComponent } from '../../components/table/table.component';
import { MatButtonModule } from '@angular/material/button';
import { AlertService } from '../../services/alert.service';
import { ServicesStore } from '../../stores/services.store';
import { DialogFormComponent } from '../../components/dialogs/dialog-form/dialog-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'ace-provider',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    TableComponent,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.css',
})
export class ProviderComponent implements OnInit {
  readonly servicesStore = inject(ServicesStore);
  columns = [
    { key: 'id', display: 'ID' },
    { key: 'name', display: 'Name' },
    { key: 'description', display: 'Description' },
    { key: 'available', display: 'Available' },
    { key: 'effectif', display: 'Effectif' },
    { key: 'price', display: 'Price' },
    { key: 'service_type', display: 'Type of the service' }
  ];

  constructor(
    private readonly alertService: AlertService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.servicesStore.refreshServices()
  }

  validateService(row: {name: string, id: number}) {
    this.servicesStore.validateService(row.id);
    // Put user mail in snackbar
    this.alertService.info(`Service ${row.name} (${row.id}) was validated, an email was sent to the user`);
  }

  editRow(row: {id: number}) {
    this.dialog.open(DialogFormComponent, {
      data: {name: "hello"}
    });
    
    console.log(JSON.stringify(row.id))
  }

  deleteRow(row: {name: string, id: number}) {
    this.servicesStore.deleteService(row.id);
    this.alertService.info(`Service ${row.name} (${row.id}) was deleted`);
  }

}