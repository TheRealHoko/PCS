import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesService } from '../services/properties.service';

@Component({
  selector: 'ace-property',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css',
})
export class PropertyComponent implements OnInit {
  constructor(
    private readonly propertiesService: PropertiesService
  ) {}

  ngOnInit(): void {

  }


}
