import { Component } from '@angular/core';
import { NewBroadcastComponent } from '../new-broadcast/new-broadcast.component';

@Component({
  selector: 'app-broadcast-history',
  standalone: true,
  imports: [NewBroadcastComponent],
  templateUrl: './broadcast-history.component.html',
  styleUrls: ['./broadcast-history.component.scss'],
})
export class BroadcastHistoryComponent {}
