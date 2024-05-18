import { Component } from '@angular/core';
import { SidebarComponent } from '../../ui/sidebar/sidebar.component';
import { ChatVPComponent } from '../../ui/chat-vp/chat-vp.component';
import { ChatSettingsComponent } from '../../ui/chat-settings/chat-settings.component';
import { CommonModule } from '@angular/common';
import { SmallMediaNavigationService } from './small-media-navigation.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    SidebarComponent,
    ChatVPComponent,
    ChatSettingsComponent,
    CommonModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  selection: boolean = false;
  constructor(private _smallMediaNav: SmallMediaNavigationService) {}

  ngOnInit() {
    this.selectionListener();
  }

  selectionListener() {
    this._smallMediaNav.selected.subscribe((value) => {
      this.selection = value;
    });
  }
}
