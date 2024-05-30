import { RolesService } from './../../../core/services/roles.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubUser } from 'src/app/core/models/sub-user';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SubUserService } from 'src/app/core/services/sub-user.service';

@Component({
  selector: 'app-new-sub-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-sub-user.component.html',
  styleUrls: ['./new-sub-user.component.scss'],
})
export class NewSubUserComponent {
  @Output() clickEvent: EventEmitter<MouseEvent> =
    new EventEmitter<MouseEvent>();
  @Input() user!: SubUser;
  @Input() method: string;
  constructor(
    private _formBuilder: FormBuilder,
    private SubUserService: SubUserService,
    private RolesService: RolesService
  ) {}
  addUserForm: FormGroup;
  roles: any;
  ngOnInit() {
    this.getRoles();
    this.addUserForm = this._formBuilder.group({
      firstName: [
        { value: this.user?.firstName || '', disabled: this.method == 'view' },
        [Validators.required],
      ],
      lastName: [
        { value: this.user?.lastName || '', disabled: this.method == 'view' },
        [Validators.required],
      ],
      emailAddress: [
        {
          value: this.user?.emailAddress || '',
          disabled: this.method == 'view',
        },
        [Validators.required],
      ],
      phoneNumber: [
        {
          value: this.user?.phoneNumber || '',
          disabled: this.method == 'view',
        },
        [Validators.required],
      ],
      id: [
        {
          value: this.user?.id || '',
          disabled: this.method == 'view',
        },
      ],
      roleId: [
        {
          value: this.user?.roleId || 'Default',
          disabled: this.method == 'view',
        },
        [Validators.required],
      ],
    });
    if (this.method != 'view') {
      this.addUserForm.addControl('password', this._formBuilder.control(''));
    }
  }

  addUser() {
    console.log(this.addUserForm);
    if (this.addUserForm.valid) {
      this.SubUserService.addSubUser(this.addUserForm.value).subscribe({
        next: (respone) => {
          console.log(respone);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.clickEvent.emit();
        },
      });
    } else if (this.addUserForm.invalid) {
      console.log('form unvalid');
      return;
    }
  }

  updateUser() {
    // console.log(this.addUserForm.value);
    if (this.addUserForm.valid) {
      this.SubUserService.updateSubUser(this.addUserForm.value).subscribe({
        next: (respone) => {
          console.log(respone);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.clickEvent.emit();
        },
      });
    } else if (this.addUserForm.invalid) {
      console.log('form unvalid');
      return;
    }
  }
  getRoles() {
    this.RolesService.getRoles().subscribe({
      next: (resp) => {
        console.log(resp);
        this.roles = resp;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
