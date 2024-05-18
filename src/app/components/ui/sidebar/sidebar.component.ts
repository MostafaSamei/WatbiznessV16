import { Component } from '@angular/core';
import { SmallMediaNavigationService } from '../../pages/main-page/small-media-navigation.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  selection: boolean = false;
  constructor(private _smallMediaNav: SmallMediaNavigationService) {}

  toggle() {
    this.selection = true;
    this._smallMediaNav.selected.next(this.selection);
  }
}
