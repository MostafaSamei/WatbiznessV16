import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { NewBroadcastComponent } from '../new-broadcast/new-broadcast.component';
import { Broadcast } from 'src/app/core/models/broadcast';
import { DatePipe, NgFor, NgIf } from '@angular/common';
// import { NgxPaginationModule } from 'ngx-pagination';
import { BroadcastService } from 'src/app/core/services/broadcast.service';
import { BroadCastStatistics } from 'src/app/core/models/broad-cast-statistics';
import { client } from 'src/app/core/models/client';
import { ClientsService } from 'src/app/core/services/clients.service';
import { ViewBroadcastComponent } from '../view-broadcast/view-broadcast.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-broadcast-history',
  standalone: true,
  imports: [NewBroadcastComponent, NgFor, DatePipe, NgIf, NgxPaginationModule],
  templateUrl: './broadcast-history.component.html',
  styleUrls: ['./broadcast-history.component.scss'],
})
export class BroadcastHistoryComponent {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  offCanvusLable: string;
  clients: client[] = [];
  path!: string;
  constructor(
    private BroadcastService: BroadcastService,
    private clientService: ClientsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.getClientsNoPagation();
    this.getStatistics();
    this.path = this.route.snapshot.url[0].path;
    if (this.path == 'history') {
      this.getBroadCasts();
    } else if (this.path == 'Scheduled') {
      this.getBroadCasts(5, 1, true);
    }
    console.log();
  }
  paginationDetails: any = {
    PageSize: 5,
    CurrentPage: 1,
    TotalCount: 0,
    TotalPages: 0,
  };
  broadcasts: Broadcast[] = [];
  statistics: BroadCastStatistics = {
    sent: 0,
    delivered: 0,
    failed: 0,
    replied: 0,
  };
  pageSizeChanged($event) {
    console.log($event.target.value);
    this.getBroadCasts($event.target.value);
  }
  previousPage() {
    this.getBroadCasts(
      this.paginationDetails.PageSize,
      this.paginationDetails.CurrentPage - 1
    );
  }
  nextPage() {
    this.getBroadCasts(
      this.paginationDetails.PageSize,
      this.paginationDetails.CurrentPage + 1
    );
  }
  getStatistics() {
    this.BroadcastService.getBroadcastStatistics().subscribe({
      next: (resp) => {
        this.statistics = resp;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getBroadCasts(pageSize = 5, pageNumber = 1, isSendTimeNow = null) {
    this.BroadcastService.getBroadCasts(
      pageSize,
      pageNumber,
      isSendTimeNow
    ).subscribe({
      next: (resp) => {
        this.broadcasts = resp.body;
        this.paginationDetails = JSON.parse(resp.headers.get('Pagination'));
        console.log(resp.body);
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
    this.clientService.getClients(1000, 1).subscribe({
      next: (resp) => {
        this.clients = resp.body;
        console.log(resp.body);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getClientsNoPagation() {
    this.clientService.getClientsNoPagation().subscribe({
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
      compRef.instance.clickEvent.subscribe((val) => {
        this.closeOffCanvas();
        if (this.path == 'history') {
          this.getBroadCasts();
        } else if (this.path == 'Scheduled') {
          this.getBroadCasts(5, 1, true);
        }
      });
      compRef.instance.clients = this.clients;
    } else if (method == 'view') {
      compRef = this.container.createComponent(ViewBroadcastComponent);
      compRef.instance.broadcase = broadcase;
    }
  }
  clearContainer() {
    this.container.clear();
  }
  closeOffCanvas(): void {
    document.getElementById('closeOffCanvasBtn')?.click();
  }
}
