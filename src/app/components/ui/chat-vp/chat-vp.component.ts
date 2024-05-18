import { Component, ElementRef } from '@angular/core';
import { SmallMediaNavigationService } from '../../pages/main-page/small-media-navigation.service';
import { ChatSettingsComponent } from '../chat-settings/chat-settings.component';
import { QuickRepliesComponent } from '../quick-replies/quick-replies.component';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';

@Component({
  selector: 'app-chat-vp',
  standalone: true,
  imports: [ChatSettingsComponent, QuickRepliesComponent, PickerComponent],
  templateUrl: './chat-vp.component.html',
  styleUrls: ['./chat-vp.component.scss'],
})
export class ChatVPComponent {
  values: string = '';
  selectedEmoji: any;
  selected = false;
  constructor(private _smallMediaNav: SmallMediaNavigationService) {}
  ngOnInit() {
    this.selectionListener();
  }

  selectionListener() {
    this._smallMediaNav.selected.subscribe((value) => {
      this.selected = value;
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
    console.log($event);
    this.selectedEmoji = $event.emoji.native;
    // let lastValue = document.getElementById('messagingField');
    // console.log(lastValue);
    // lastValue += this.selectedEmoji;
    this.values += this.selectedEmoji;
  }
  onKey(event: any) {
    // without type info
    this.values = event.target.value;
  }
}
