import { OpeningChatSettingsService } from './../../pages/main-page/opening-chat-settings.service';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SmallMediaNavigationService } from '../../pages/main-page/small-media-navigation.service';
import { ChatSettingsComponent } from '../chat-settings/chat-settings.component';
import { QuickRepliesComponent } from '../quick-replies/quick-replies.component';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { MessageService } from '../../../core/services/message.service';
import { SignalRService } from '../../../core/services/signalr.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Template } from '../../../core/models/template';
import { TemplateService } from '../../../core/services/template.service';

@Component({
  selector: 'app-chat-vp',
  standalone: true,
  imports: [
    ChatSettingsComponent,
    QuickRepliesComponent,
    PickerComponent,
    NgForOf,
    NgIf,
    DatePipe,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
  ],
  templateUrl: './chat-vp.component.html',
  styleUrls: ['./chat-vp.component.scss'],
})
export class ChatVPComponent implements OnInit, AfterViewChecked {
  @Input() chat;

  @ViewChild('scrollableDiv') private myScrollContainer: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  showSettings: boolean;
  messageContent: string = '';

  selectedFile: File | null = null;
  fileContent: string | ArrayBuffer | null = '';
  disableMessaging: boolean = false;

  selectedEmoji: any;
  selected = false;

  messageTemplates: Template[];
  selectedMessageTemplateId: string;
  constructor(
    private _smallMediaNav: SmallMediaNavigationService,
    private messageService: MessageService,
    private signalRService: SignalRService,
    private templateService: TemplateService,
    private openingChatSettingsService: OpeningChatSettingsService
  ) {
    signalRService.messageReceived$.subscribe((msg) => {
      // Handle incoming messages

      if (this.chat.clientId == msg.clientId) {
        this.chat.messages.push({
          content: msg.message,
          sentByUser: false,
          createdAt: Date.now(),
        });

        this.chat.opened = true;

        this.scrollToBottom();
      }

      this.playNotification();
      this.refreshGroupChats();

    });
  }

  changeChatSettingsState() {
    if (window.innerWidth < 768) {
      document.getElementById('chatSettings').style.display = 'none';
    }
    this.openingChatSettingsService.showSettings.next(
      !this.openingChatSettingsService.showSettings.getValue()
    );
  }
  ngOnInit() {
    this.openingChatSettingsService.showSettings.subscribe((value) => {
      this.showSettings = value;
    });

    this.selectionListener();
    this.scrollToBottom();
    this.loadTemplateMessages();
  }

  selectionListener() {
    this._smallMediaNav.selected.subscribe((value) => {
      this.selected = value;
    });
  }

  goToLink(fileUrl: string) {
    window.open(fileUrl, '_blank');
  }

  sendMessage() {
    let message = {
      file: this.selectedFile,
      content: this.messageContent,
      chatId: this.chat.id,
    };

    if (this.messageContent == '') return;

    this.messageService.CreateMessage(message).subscribe((messageResult) => {
      this.chat.messages.push({
        content: messageResult.content,
        sentByUser: messageResult.sentByUser,
        createdAt: messageResult.createdAt,
        fileType: messageResult.fileType,
        fileUrl: messageResult.fileUrl,
      });

      this.refreshGroupChats();
      this.resetMessageInput();
    });
  }

  back() {
    this.selected = false;
    this._smallMediaNav.selected.next(this.selected);
  }
  showMsgSettings(ele: any) {
    if (ele.target.firstElementChild.classList.contains('d-none')) {
      ele.target.firstElementChild.classList.remove('d-none');
    } else {
      ele.target.firstElementChild.classList.add('d-none');
    }
  }

  sendMessageTemplate() {
    this.messageService
      .CreateMessageWithTemplate({
        chatId: this.chat.id,
        templateId: this.selectedMessageTemplateId,
      })
      .subscribe((a) => {
        this.chat.messages.push({
          content: a.content,
          sentByUser: a.sentByUser,
          createdAt: a.createdAt,
          fileType: a.fileType,
          fileUrl: a.fileUrl,
        });

        // hide the modal
        this.closeModal();
        this.resetMessageInput();
      });
  }
  closeModal() {
    document.getElementById('modalSaveBtn')?.click();
  }
  select($event: any) {
    this.selectedEmoji = $event.emoji.native;
    // let lastValue = document.getElementById('messagingField');
    // console.log(lastValue);
    // lastValue += this.selectedEmoji;
    this.messageContent += this.selectedEmoji;
  }
  onKey(event: any) {
    // without type info
    this.messageContent = event.target.value;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      this.messageContent = input.files[0].name;
      this.disableMessaging = true;
    }
  }

  loadTemplateMessages() {
    this.templateService
      .getTemplatesNoPagation()
      .subscribe((templates) => (this.messageTemplates = templates));
  }

  changeSelectedTemplate(event: any) {
    this.selectedMessageTemplateId = event.target.value;
  }

  private playNotification(){
    let audio = new Audio();
    audio.src = "../../../assets/sounds/notification.wav";
    audio.load();
    audio.play();
  }

  private refreshGroupChats() {
    this.openingChatSettingsService.reloadSidebarGroupChats.next(
      !this.openingChatSettingsService.reloadSidebarGroupChats.value
    );
  }

  private resetMessageInput() {
    this.messageContent = '';
    this.selectedFile = null;
    this.disableMessaging = false;
  }

  private scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  ngOnDestroy() {
    this.openingChatSettingsService.showSettings.next(false);
  }
}
