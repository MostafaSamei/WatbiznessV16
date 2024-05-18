import { Component } from '@angular/core';
import { NewContactComponent } from '../../ui/new-contact/new-contact.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [NewContactComponent],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {}
