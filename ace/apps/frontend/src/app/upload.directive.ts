import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface FileUpload {
  file: File;
  url: SafeUrl;
}

export enum DropColor {
  Default = '#C6E4F1',
  Over = '#FF8383'
}

@Directive({
  selector: '[aceUpload]',
  standalone: true,
})
export class UploadDirective {

  constructor(private readonly sanitizer: DomSanitizer) {}

  @Output() dropFiles: EventEmitter<FileUpload[]> = new EventEmitter();
  @HostBinding('style.background') backgroundColor = DropColor.Default;

  @HostListener('dragover', ['$event']) public dragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.backgroundColor = DropColor.Over;
  }

  @HostListener('dragleave', ['$event']) public dragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation()
    this.backgroundColor = DropColor.Default;
  }

  @HostListener('drop', ['$event']) public drop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation()
    this.backgroundColor = DropColor.Default;

    let fileList = event.dataTransfer?.files;

    let files: FileUpload[] = [];

    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const url = this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        );
        files.push({ file, url });
      }
  
      if (files.length > 0) {
        this.dropFiles.emit(files);
      }

    }
  }
}
