import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ace-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnChanges {
  @Input() datasource: CdkTableDataSourceInput<any> = [];
  @Input() columns: { key: string; display: string }[] = [];
  @Input() actionTemplate: TemplateRef<any> | null = null;

  displayedColumns: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']) {
      this.displayedColumns = this.columns.map((c) => c.key).concat('actions');
    }
  }

  isObjectType(value: any): boolean {
    return typeof value === 'object' && value.length !== 0;
  }

  isBooleanType(value: any): boolean {
    return typeof value === 'boolean';
  }
}
