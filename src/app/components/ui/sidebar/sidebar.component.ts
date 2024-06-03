import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SmallMediaNavigationService } from '../../pages/main-page/small-media-navigation.service';
import { ChatService } from '../../../core/services/chat.service';
import { groupchat } from '../../../core/models/groupchat';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { chatStatusEnum } from '../../../core/models/chat';
import { FormsModule } from '@angular/forms';
import {OpeningChatSettingsService} from "../../pages/main-page/opening-chat-settings.service";
import {client} from "../../../core/models/client";
import {ClientsService} from "../../../core/services/clients.service";
import {Dictionary} from "../../../core/models/dictionary";
import {Template} from "../../../core/models/template";
import {TemplateService} from "../../../core/services/template.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgForOf, DatePipe, FormsModule, NgIf],
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

  clients: Dictionary<string>;
  selectedContactId: string;

  messageTemplates: Template[];
  selectedMessageTemplateId: string;

  constructor(
    private _smallMediaNav: SmallMediaNavigationService,
    private chatService: ChatService,
    private clientService: ClientsService,
    private templateService: TemplateService,
    private openingChatSettingsService: OpeningChatSettingsService
  ) {}

  ngOnInit() {
    this.loadClients();
    this.loadTemplateMessages();
    this.loadGroupChats();
    this.openingChatSettingsService.reloadSidebarGroupChats.subscribe(bool => {console.log("sidebargroupchat is fired");
        this.loadGroupChats();
    });
  }

  toggleAndOpen(clientId: string) {
    // if (window.innerWidth <= 991) {
    this.selection = true;
    this._smallMediaNav.selected.next(this.selection);
    // }

    this.clientActiveId = clientId;

    this.openChat.emit(clientId);
  }

  filterChats() {
    this.groupChats = this.allGroupChats
      .map((group) => {
        return {
          day: group.day,
          date: group.date,
          chats: group.chats.filter(
            (chat) =>
              chat.client.name
                .toLowerCase()
                .includes(this.inputValue.toLowerCase()) ||
              chat.client.phoneNumber
                .toLowerCase()
                .includes(this.inputValue.toLowerCase())
          ),
        };
      })
      .filter((group) => group.chats.length > 0);
  }

  changeSelectedContact(event: any) {
    this.selectedContactId = event.target.value;
  }

  changeSelectedTemplate(event: any) {
    this.selectedMessageTemplateId = event.target.value;
  }

  sendMessageTemplate() {
    this.chatService
      .CreateChat({
        clientId: this.selectedContactId,
        templateId: this.selectedMessageTemplateId,
      })
      .subscribe((a) => {
        this.loadGroupChats();

        // hide the modal
        this.closeModal();
      });
  }

  private closeModal() {
    document.getElementById('closeNewChatModalBtn')?.click();
  }

  private loadTemplateMessages() {
    this.templateService
      .getTemplatesNoPagation()
      .subscribe((templates) => (this.messageTemplates = templates));
  }

  private loadGroupChats(nameOrPhone: string = '') {
    this.chatService.GetGroupChats(nameOrPhone).subscribe((groupChats) => {
      this.allGroupChats = groupChats;
      this.groupChats = groupChats;
    });
  }

  private loadClients() {
    this.clientService.getLookUpClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  protected readonly chatStatusEnum = chatStatusEnum;
  protected readonly Object = Object;
}
