import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { NewContactComponent } from '../../ui/new-contact/new-contact.component';
import { ClientsService } from 'src/app/core/services/clients.service';
import { client } from 'src/app/core/models/client';
import { NgFor, NgIf } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [NewContactComponent, NgFor, NgIf, NgxPaginationModule],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  currentPage: number;
  clients: client[];
  offCanvasLabel: string;
  selectedclient: client | null = null;

  paginationDetails: any = {
    PageSize: 5,
    CurrentPage: 1,
    TotalCount: 0,
    TotalPages: 0,
  };
  constructor(private clientsService: ClientsService) {}
  ngOnInit() {
    this.gettingClients();
  }
  gettingClients(pageSize = 10, pageNumber = 1) {
    this.clientsService.getClients(pageSize, pageNumber).subscribe({
      next: (resp) => {
        this.paginationDetails = JSON.parse(resp.headers.get('Pagination'));
        console.log(resp.body);

        this.clients = resp.body;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  selectUser(SubUser: client) {
    this.selectedclient = SubUser;
  }
  deleteUser() {
    this.clientsService.deleteClient(this.selectedclient.userId).subscribe({
      next: (resp) => {
        console.log(resp);

        this.gettingClients();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  pageSizeChanged($event) {
    console.log($event.target.value);
    this.gettingClients($event.target.value);
  }
  previousPage() {
    this.gettingClients(
      this.paginationDetails.PageSize,
      this.paginationDetails.CurrentPage - 1
    );
  }
  nextPage() {
    this.gettingClients(
      this.paginationDetails.PageSize,
      this.paginationDetails.CurrentPage + 1
    );
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
