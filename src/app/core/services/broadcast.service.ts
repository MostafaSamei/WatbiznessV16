import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

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
      `${environment.baseURL}/Broadcast/v1.0/Broadcast/GetBroadcasts`
    );
  }
}
