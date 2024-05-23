import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { SmallMediaNavigationService } from '../../pages/main-page/small-media-navigation.service';
import {ChatService} from "../../../core/services/chat.service";
import {groupchat} from "../../../core/models/groupchat";
import {DatePipe, NgForOf} from "@angular/common";
import {chatStatusEnum} from "../../../core/models/chat";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    FormsModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() openChat = new EventEmitter<string>();

  selection: boolean = false;
  allGroupChats: groupchat[];
  groupChats: groupchat[];
  clientActiveId: string;

  inputValue: string;

  constructor(private _smallMediaNav: SmallMediaNavigationService, private chatService: ChatService) {}

  ngOnInit() {
    this.loadGroupChats();
  }

  toggleAndOpen(clientId: string) {
    if (window.innerWidth <= 991) {
      this.selection = true;
      this._smallMediaNav.selected.next(this.selection);
    }

    this.clientActiveId = clientId;

    this.openChat.emit(clientId);
  }

  filterChats() {
    this.groupChats = this.allGroupChats.map(group => {
      return {
        day: group.day,
        date: group.date,
        chats: group.chats.filter(chat =>
          chat.client.name.toLowerCase().includes(this.inputValue.toLowerCase()) ||
          chat.client.phoneNumber.toLowerCase().includes(this.inputValue.toLowerCase()))
      };
    }).filter(group => group.chats.length > 0);
  }

  private loadGroupChats(nameOrPhone: string = '') {
    this.chatService.GetGroupChats(nameOrPhone).subscribe(groupChats => {
      this.allGroupChats = groupChats;
      this.groupChats = groupChats;
    });
  }

  protected readonly chatStatusEnum = chatStatusEnum;
}
