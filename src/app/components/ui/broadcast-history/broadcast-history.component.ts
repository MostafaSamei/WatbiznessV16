import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { NewBroadcastComponent } from '../new-broadcast/new-broadcast.component';
import { Broadcast } from 'src/app/core/models/broadcast';
import { DatePipe, NgFor } from '@angular/common';
// import { NgxPaginationModule } from 'ngx-pagination';
import { BroadcastService } from 'src/app/core/services/broadcast.service';
import { BroadCastStatistics } from 'src/app/core/models/broad-cast-statistics';
import { client } from 'src/app/core/models/client';
import { ClientsService } from 'src/app/core/services/clients.service';
import { ViewBroadcastComponent } from '../view-broadcast/view-broadcast.component';

@Component({
  selector: 'app-broadcast-history',
  standalone: true,
  imports: [NewBroadcastComponent, NgFor, DatePipe],
  templateUrl: './broadcast-history.component.html',
  styleUrls: ['./broadcast-history.component.scss'],
})
export class BroadcastHistoryComponent {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  offCanvusLable: string;
  clients: client[] = [];
  ///pagination vars
  pageSize: number = 5;
  p: number = 1;
  total: number = 0;
  constructor(
    private BroadcastService: BroadcastService,
    private clientService: ClientsService
  ) {}
  ngOnInit() {
    this.getClients();
    this.getStatistics();
    this.getBroadCasts();
  }
  broadcasts: Broadcast[] = [];
  statistics: BroadCastStatistics = {
    sent: 0,
    delivered: 0,
    failed: 0,
    replied: 0,
  };
  getStatistics() {
    this.BroadcastService.getBroadcastStatistics().subscribe({
      next: (resp) => {
        this.statistics = resp;
        // console.log(this.statistics);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getBroadCasts() {
    this.BroadcastService.getBroadCasts().subscribe({
      next: (resp) => {
        // console.log(resp);
        this.broadcasts = resp.body;
        // this.statistics = resp;
        this.pageSize = this.broadcasts.length;
        this.total = this.broadcasts.length;
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
  getClients() {
    this.clientService.getClients().subscribe({
      next: (resp) => {
        this.clients = resp;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  dynamicCompGeneration(method: string, broadcase: Broadcast | null) {
    this.setLable(method);
    this.loadComponent(method, broadcase);
  }

  loadComponent(method, broadcase) {
    this.container.clear();
    let compRef;
    if (method == 'add') {
      compRef = this.container.createComponent(NewBroadcastComponent);
      compRef.instance.clients = this.clients;
    } else if (method == 'view') {
      compRef = this.container.createComponent(ViewBroadcastComponent);
      compRef.instance.broadcase = broadcase;
    }
  }
  clearContainer() {
    this.container.clear();
  }
}
