import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'ace-provider',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule
  ],
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.css',
})
export class ProviderComponent {
  dataSource = PROVIDER;
  tableContenu: string[] = ['name', 'service', 'lieu'];
  enAttenteValider = PROVIDER_WAITLIST;
  tableContenuAttente: string[] = ['name', 'service', 'lieu']
}

export interface provider {
  name: string;
  service: string;
  lieu: string;
}

export interface providerWaitlist {
  name: string;
  service: string;
  lieu: string;
}

const PROVIDER : provider[] = [
  {name: 'Mehdi', service: 'Nettoyage', lieu: 'Paris'},
]

const PROVIDER_WAITLIST: providerWaitlist[] = [
  {name: 'Mehdi', service: 'Nettoyage', lieu: 'Paris'},
];

