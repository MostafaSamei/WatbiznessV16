import { Component } from '@angular/core';
import { NewContactComponent } from '../../ui/new-contact/new-contact.component';
import { ClientsService } from 'src/app/core/services/clients.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [NewContactComponent],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  constructor(private clients: ClientsService) {}
  ngOnInit() {
    this.clients.getClients().subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
