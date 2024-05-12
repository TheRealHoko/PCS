import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'ace-location',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
})
export class LocationComponent {
  dataSource = LOCATION;
  tableContenu: string[] = ['position', 'lieu', 'type', 'pièce', 'prix'];
}

export interface location {
  position: number;
  lieu: string;
  type: string;
  pièce: number;
  prix: number;
}

const LOCATION: location[] = [
  { position: 1, lieu: 'Madrid', type: 'appartement', pièce: 1, prix: 178 },
  { position: 2, lieu: 'Paris', type: 'Maison', pièce: 2, prix: 180 },
  { position: 3, lieu: 'Marseille', type: 'bangalo', pièce: 7, prix: 70 },
];
