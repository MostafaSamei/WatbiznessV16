import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmallMediaNavigationService {
  selected:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false)
}
