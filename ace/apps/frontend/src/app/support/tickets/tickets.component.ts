import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'apps/frontend/src/environments/environment';
import { MatTableModule } from '@angular/material/table';
import { Ticket } from '@ace/shared';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TicketsService } from '../../services/tickets.service';

@Component({
  selector: 'ace-tickets',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
export class TicketsComponent {
  ticketsService = inject(TicketsService);
  tickets: Ticket[] = [];
  displayedColumns = ['id', 'topic', 'description', 'status', 'actions'];

  constructor() {
    this.ticketsService.getMyTickets().subscribe((tickets: Ticket[]) => {
      console.log(tickets);
      this.tickets = tickets;
    });
  }
}
