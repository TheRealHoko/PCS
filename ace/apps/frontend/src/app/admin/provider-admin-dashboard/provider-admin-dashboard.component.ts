import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TableComponent } from '../../components/table/table.component';
import { MatButtonModule } from '@angular/material/button';
import { AlertService } from '../../services/alert.service';
import { ServicesStore } from '../../stores/services.store';
import { DialogFormComponent } from '../../components/dialogs/dialog-form/dialog-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ace-provider',
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
  templateUrl: './provider-admin-dashboard.component.html',
  styleUrl: './provider-admin-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderAdminDashboardComponent implements OnInit {
  readonly servicesStore = inject(ServicesStore);
  columns = [
    { key: 'id', display: 'ID' },
    { key: 'name', display: 'Name' },
    { key: 'status', display: 'Status'},
    { key: 'description', display: 'Description' },
    { key: 'base_price', display: 'Price' },
    { key: 'service_type', display: 'Type of the service' },
  ];

  constructor(
    private readonly alertService: AlertService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.servicesStore.refreshServices();
  }

  validateService(row: { name: string; id: number }) {
    this.servicesStore.validateService(row.id);
    // Put user mail in snackbar
    this.alertService.info(
      `Service ${row.name} (${row.id}) was validated, an email was sent to the user`
    );
  }

  invalidateService(row: { name: string; id: number }) {
    const invalidatedService = this.servicesStore.invalidateService(row.id);
    console.log(invalidatedService);
    // Put user mail in snackbar
    this.alertService.info(
      `Service ${row.name} (${row.id}) was refused, an email was sent to the user`
    );
  }

  deleteRow(row: { name: string; id: number }) {
    this.servicesStore.deleteService(row.id);
    this.alertService.info(`Service ${row.name} (${row.id}) was deleted`);
  }
}
