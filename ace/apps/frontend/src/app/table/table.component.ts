import { Component, Input, OnChanges, SimpleChanges, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { CdkTableDataSourceInput } from '@angular/cdk/table';

@Component({
  selector: 'ace-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatExpansionModule,
    MatButtonModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnChanges {
  datasource = input<CdkTableDataSourceInput<any>>([]);
  @Input() columns: { key: string, display: string }[] = [];
  
  @Input() actions?: MatButton[] = [];

  displayedColumns: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']) {
      this.displayedColumns = this.columns.map(c => c.key).concat('actions');
    }
  }
  
  editRow(row: any) {
    console.log(`Editing ${row}`);
  }

  deleteRow(row: any) {
    console.log(`Deleting ${row}`);
  }

  isObjectType(value: any): boolean {
    return typeof value === 'object' && value.length !== 0;
  }

}