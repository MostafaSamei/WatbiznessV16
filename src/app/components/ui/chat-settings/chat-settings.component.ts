import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { OpeningChatSettingsService } from '../../pages/main-page/opening-chat-settings.service';

@Component({
  selector: 'app-chat-settings',
  standalone: true,
  imports: [NgClass],
  templateUrl: './chat-settings.component.html',
  styleUrls: ['./chat-management.component.scss'],
})
export class ChatSettingsComponent {
  showSettings: boolean;

  constructor(private OpeningChatSettingsService: OpeningChatSettingsService) {}

  ngOnInit() {
    this.OpeningChatSettingsService.showSettings.subscribe((value) => {
      this.showSettings = value;
    });
  }
  closeMenu() {
    this.OpeningChatSettingsService.showSettings.next(
      !this.OpeningChatSettingsService.showSettings.getValue()
    );
  }
}
