import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { SmallMediaNavigationService } from '../../pages/main-page/small-media-navigation.service';
import { ChatSettingsComponent } from '../chat-settings/chat-settings.component';
import { QuickRepliesComponent } from '../quick-replies/quick-replies.component';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {MessageService} from "../../../core/services/message.service";
import {SignalRService} from "../../../core/services/signalr.service";

@Component({
  selector: 'app-chat-vp',
  standalone: true,
  imports: [ChatSettingsComponent, QuickRepliesComponent, PickerComponent, NgForOf, NgIf, DatePipe],
  templateUrl: './chat-vp.component.html',
  styleUrls: ['./chat-vp.component.scss'],
})
export class ChatVPComponent implements OnInit, AfterViewChecked {
  @Input() chat;

  @ViewChild('scrollableDiv') private myScrollContainer: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  messageContent: string = '';

  selectedFile: File | null = null;
  fileContent: string | ArrayBuffer | null = '';

  selectedEmoji: any;
  selected = false;
  constructor(private _smallMediaNav: SmallMediaNavigationService,
              private messageService: MessageService,
              private signalRService: SignalRService) {

    signalRService.messageReceived$.subscribe(msg => {
      // Handle incoming messages
      this.chat.messages.push({
        content: msg.message,
        sentByUser: false,
        createdAt: Date.now()
      });

      this.scrollToBottom();
    });
  }
  ngOnInit() {
    this.selectionListener();
    this.scrollToBottom();
  }

  selectionListener() {
    this._smallMediaNav.selected.subscribe((value) => {
      this.selected = value;
    });
  }

  sendMessage() {
    let message = {
      file: this.selectedFile,
      content: this.messageContent,
      chatId: this.chat.id
    }

    if (this.messageContent == '') return;

    this.messageService.CreateMessage(message).subscribe(() => {

      this.messageContent = '';

      this.chat.messages.push({
        content: message.content,
        sentByUser: true,
        createdAt: Date.now()
      });

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
    }
  }

  private scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
}
