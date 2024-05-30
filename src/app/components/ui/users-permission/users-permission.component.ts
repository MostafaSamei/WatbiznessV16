import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RolesService } from './../../../core/services/roles.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-users-permission',
  standalone: true,
  imports: [NgFor, DatePipe, NgIf],
  templateUrl: './users-permission.component.html',
  styleUrls: ['./users-permission.component.scss'],
})
export class UsersPermissionComponent {
  constructor(private RolesService: RolesService) {}
  ngOnInit() {
    this.getRoles();
  }
  roles: any;

  getRoles() {
    this.RolesService.getRoles().subscribe({
      next: (resp) => {
        // console.log(resp);
        this.roles = resp;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  permessionMap(arr, permission: string) {
    return arr.permissions
      .map((x) => {
        return x.name == permission;
      })
      .includes(true);
  }
}
