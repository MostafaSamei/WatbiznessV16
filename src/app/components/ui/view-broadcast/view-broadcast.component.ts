import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { Broadcast } from 'src/app/core/models/broadcast';
import { BroadcastService } from 'src/app/core/services/broadcast.service';

@Component({
  selector: 'app-view-broadcast',
  standalone: true,
  imports: [NgIf, DatePipe],
  templateUrl: './view-broadcast.component.html',
  styleUrls: ['./view-broadcast.component.scss'],
})
export class ViewBroadcastComponent {
  constructor(private BroadcastService: BroadcastService) {}
  @Input() broadcase: Broadcast;
  date: Date;
  ngOnInit() {
    // console.log(this.broadcase);
    this.date = new Date(
      `${this.broadcase.sendTime.split(' ')[0]} ${this.broadcase.timeSpan} `
    );
    this.getBroadCast();
  }
  getBroadCast() {
    this.BroadcastService.getBroadCast(this.broadcase.id).subscribe({
      next: (resp) => {
        this.broadcase = resp;
        console.log(resp);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
