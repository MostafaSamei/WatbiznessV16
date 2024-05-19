import { Component } from '@angular/core';
import { NewContactComponent } from '../../ui/new-contact/new-contact.component';
import { ClientsService } from 'src/app/core/services/clients.service';
import { client } from 'src/app/core/models/client';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [NewContactComponent, NgFor],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  clients: client[];
  constructor(private clientsService: ClientsService) {}
  ngOnInit() {
    this.clientsService.getClients().subscribe({
      next: (resp) => {
        this.clients = resp;
        console.log(this.clients);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
