import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpeningChatSettingsService {
  public showSettings = new BehaviorSubject<boolean>(false);

  constructor() {}
}
