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
  offCanvasLabel: string;
  constructor(private clientsService: ClientsService) {}
  ngOnInit() {
    this.gettingClients();
  }
  gettingClients() {
    this.clientsService.getClients().subscribe({
      next: (resp) => {

        let pagination = JSON.parse(resp.headers.get('Pagination'));
        
        this.clients = resp.body;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  setLabel(method: string) {
    if (method == 'add') {
      this.offCanvasLabel = 'Add New';
    } else if (method == 'edit') {
      this.offCanvasLabel = 'Edit';
    } else if (method == 'view') {
      this.offCanvasLabel = 'View';
    }
  }

  dynamicCompGeneration(method: string, client: client | null) {
    this.setLabel(method);
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
