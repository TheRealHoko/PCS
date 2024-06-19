import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUpload, UploadDirective } from './upload.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ace-upload',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, UploadDirective],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  files: FileUpload[] = [];

  @Input() maxFiles: number = 5;

  @Output() uploadFiles: EventEmitter<FileUpload[]> = new EventEmitter();

  onDropFiles(files: FileUpload[]) {
    if (this.files.length <  this.maxFiles) {
      this.files = [...this.files, ...files];
      if (this.files.length > 0) {
        this.uploadFiles.emit(this.files);
      }
    }
  }
}
