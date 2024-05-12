import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from '../upload/upload.component';
import { FileUpload } from '../upload.directive';
import { MatButtonModule } from '@angular/material/button';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'ace-home',
  standalone: true,
  imports: [
    CommonModule,
    UploadComponent,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent {
  // files: FileUpload[] = [];

  // constructor(private readonly uploadService: UploadService) {}

  // getFiles(files: FileUpload[]) {
  //   this.files = [...this.files, ...files];
  //   console.log(this.files);
  // }

  // onSubmit() {
  //   const form = new FormData();

  //   form.append('files', this.files[0].file);
  //   this.uploadService.upload(form).subscribe(console.log);
  // }
}
