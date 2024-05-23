import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { NewContactComponent } from '../../ui/new-contact/new-contact.component';
import { ClientsService } from 'src/app/core/services/clients.service';
import { client } from 'src/app/core/models/client';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [NewContactComponent, NgFor, NgIf],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  clients: client[];
  offCanvusLable: string;
  constructor(private clientsService: ClientsService) {}
  ngOnInit() {
    this.gettingClients();
  }
  gettingClients() {
    this.clientsService.getClients().subscribe({
      next: (resp) => {
        const headers = resp.headers;

        this.clients = resp.body;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  setLable(method: string) {
    if (method == 'add') {
      this.offCanvusLable = 'Add New';
    } else if (method == 'edit') {
      this.offCanvusLable = 'Edit';
    } else if (method == 'view') {
      this.offCanvusLable = 'View';
    }
  }

  dynamicCompGeneration(method: string, client: client | null) {
    this.setLable(method);
    this.loadComponent(method, client);
  }

  loadComponent(method, client) {
    this.container.clear();
    const compRef = this.container.createComponent(NewContactComponent);
    compRef.instance.method = method;
    if (client != null) {
      compRef.instance.client = client;
    }
  }
  clearContainer() {
    this.container.clear();
  }
}
