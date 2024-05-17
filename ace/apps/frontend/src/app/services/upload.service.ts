import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private readonly http: HttpClient) {}

  upload(files: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/uploads`, files);
  }

  uploadPropertyImages(files: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/uploads/property-images`, files);
  }

}
