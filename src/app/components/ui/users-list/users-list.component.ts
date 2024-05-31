import { SubUser } from 'src/app/core/models/sub-user';
import { SubUserService } from './../../../core/services/sub-user.service';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewSubUserComponent } from '../new-sub-user/new-sub-user.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor, DatePipe, NgxPaginationModule, NgIf, NewSubUserComponent],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  constructor(private SubUserService: SubUserService) {}
  selectedUser: SubUser | null = null;
  users: SubUser[] = [];
  offCanvasLabel: string;
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  paginationDetails: any = {
    PageSize: 5,
    CurrentPage: 1,
    TotalCount: 0,
    TotalPages: 0,
  };
  ngOnInit() {
    this.getSubUsers();
  }

  getSubUsers(pageSize = 5, pageNumber = 1) {
    this.SubUserService.getSubUsers(pageSize, pageNumber).subscribe({
      next: (resp) => {
        this.paginationDetails = JSON.parse(resp.headers.get('Pagination'));
        this.users = resp.body;
        // console.log(resp);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  selectUser(SubUser: SubUser) {
    this.selectedUser = SubUser;
  }
  deleteUser() {
    this.SubUserService.deleteSubUser(this.selectedUser.id).subscribe({
      next: (resp) => {
        console.log(resp);

        this.getSubUsers();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  pageSizeChanged($event) {
    console.log($event.target.value);
    this.getSubUsers($event.target.value);
  }
  previousPage() {
    this.getSubUsers(
      this.paginationDetails.PageSize,
      this.paginationDetails.CurrentPage - 1
    );
  }
  nextPage() {
    this.getSubUsers(
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
  dynamicCompGeneration(method: string, SubUser: SubUser | null) {
    this.setLabel(method);
    this.loadComponent(method, SubUser);
  }

  loadComponent(method, SubUser) {
    this.container.clear();
    const compRef = this.container.createComponent(NewSubUserComponent);
    compRef.instance.clickEvent.subscribe((val) => {
      this.closeOffCanvas();
      this.getSubUsers();
    });
    compRef.instance.method = method;
    if (SubUser != null) {
      compRef.instance.user = SubUser;
    }
  }

  closeOffCanvas(): void {
    document.getElementById('closeOffCanvasBtn')?.click();
  }
}
