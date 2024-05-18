import { Component } from '@angular/core';
import { NewBroadcastComponent } from '../new-broadcast/new-broadcast.component';

@Component({
  selector: 'app-broadcast-chat',
  standalone: true,
  imports: [NewBroadcastComponent],
  templateUrl: './broadcast-chat.component.html',
  styleUrls: ['./broadcast-chat.component.scss'],
})
export class BroadcastChatComponent {}
