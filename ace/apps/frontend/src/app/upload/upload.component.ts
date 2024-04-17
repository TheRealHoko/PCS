import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUpload, UploadDirective } from '../upload.directive';

@Component({
  selector: 'ace-upload',
  standalone: true,
  imports: [
    CommonModule,
    UploadDirective
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  files: FileUpload[] = [];

  onDropFiles(files: FileUpload[]) {
    this.files = [...this.files, ...files];
    console.log(this.files);
    console.log(...this.files);
  }
}
