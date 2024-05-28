import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor(private http: HttpClient) {}

  getTemplates(pageSize: number, pageNumber: number): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}/Chat/v1.0/Template/GetTemplates?PageSize=${pageSize}&PageNumber=${pageNumber}`,
      { observe: 'response' }
    );
  }
  getTemplatesNoPagation(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}/Chat/v1.0/Template/GetTemplates`
    );
  }
  syncTemplates(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseURL}/Chat/v1.0/Template/SyncTemplates`
    );
  }
  deleteTemplate(TemplateId: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.baseURL}/Chat/v1.0/Template/DeleteTemplate?id=${TemplateId}`
    );
  }
}
