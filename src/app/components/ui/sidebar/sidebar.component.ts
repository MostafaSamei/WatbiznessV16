import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { SmallMediaNavigationService } from '../../pages/main-page/small-media-navigation.service';
import {ChatService} from "../../../core/services/chat.service";
import {groupchat} from "../../../core/models/groupchat";
import {DatePipe, NgForOf} from "@angular/common";
import {chatStatusEnum} from "../../../core/models/chat";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() openChat = new EventEmitter<string>();

  selection: boolean = false;
  groupChats: groupchat[];
  clientActiveId: string;

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

  private loadGroupChats() {
    this.chatService.GetGroupChats().subscribe(groupChats => this.groupChats = groupChats);
  }

  protected readonly chatStatusEnum = chatStatusEnum;
}
