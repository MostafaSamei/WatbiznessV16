import {Component, OnInit} from '@angular/core';
import { SmallMediaNavigationService } from '../../pages/main-page/small-media-navigation.service';
import {ChatService} from "../../../core/services/chat.service";
import {groupchat} from "../../../core/models/groupchat";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  selection: boolean = false;
  groupChats: groupchat[];
  activeChatId: string;

  constructor(private _smallMediaNav: SmallMediaNavigationService, private chatService: ChatService) {}

  ngOnInit() {
    this.loadGroupChats();
  }

  toggleAndOpen(chatId: string) {
    if (window.innerWidth <= 991) {
      this.selection = true;
      this._smallMediaNav.selected.next(this.selection);
    }

    this.activeChatId = chatId;
  }

  private loadGroupChats() {
    this.chatService.GetGroupChats().subscribe(groupChats => this.groupChats = groupChats);
  }

}
