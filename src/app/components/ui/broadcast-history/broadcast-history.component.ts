import { Component } from '@angular/core';
import { NewBroadcastComponent } from '../new-broadcast/new-broadcast.component';
import { Broadcast } from 'src/app/core/models/broadcast';
import { DatePipe, NgFor } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { BroadcastService } from 'src/app/core/services/broadcast.service';
import { BroadCastStatistics } from 'src/app/core/models/broad-cast-statistics';

@Component({
  selector: 'app-broadcast-history',
  standalone: true,
  imports: [NewBroadcastComponent, NgFor, DatePipe, NgxPaginationModule],
  templateUrl: './broadcast-history.component.html',
  styleUrls: ['./broadcast-history.component.scss'],
})
export class BroadcastHistoryComponent {
  ///pagination vars
  pageSize: number = 5;
  p: number = 1;
  total: number = 0;
  constructor(private BroadcastService: BroadcastService) {}
  ngOnInit() {
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
        this.broadcasts = resp;
        // this.statistics = resp;
        this.pageSize = this.broadcasts.length;
        this.total = this.broadcasts.length;
        console.log(this.broadcasts);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
