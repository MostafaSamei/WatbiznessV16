import { Broadcast } from 'src/app/core/models/broadcast';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BroadcastService {
  constructor(private http: HttpClient) {}
  getBroadcastStatistics(): Observable<any> {
    return this.http.get(
      `${environment.baseURL}/Broadcast/v1.0/Broadcast/GetBroadcastStatistics`
    );
  }
  getBroadCasts(): Observable<any> {
    return this.http.get(
      `${environment.baseURL}/Broadcast/v1.0/Broadcast/GetBroadcasts`,
      { observe: 'response' }
    );
  }
  getBroadCast(BroadcastId: string): Observable<any> {
    return this.http.get(
      `${environment.baseURL}/Broadcast/v1.0/Broadcast/GetBroadcast?id=${BroadcastId}`
    );
  }
  addNewBroadCast(
    title: string,
    templateId: string,
    clientIds: Array<string>,
    sendTime: string | null,
    timeSpan: string | null
  ): Observable<any> {
    return this.http.post(
      `${environment.baseURL}/Broadcast/v1/Broadcast/CreateBroadcast`,
      {
        title: title,
        templateId: templateId,
        clientIds: clientIds,
        sendTime: sendTime,
        timeSpan: timeSpan,
      }
    );
  }
}
