import { Component, Input } from '@angular/core';
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
  @Input() user!: SubUser;
  @Input() method: string;
  constructor(
    private _formBuilder: FormBuilder,
    private SubUserService: SubUserService
  ) {}
  addUserForm: FormGroup;
  ngOnInit() {
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
      roleId: ['6d3a4beb-d4e6-49a3-a392-228d44f70e09', [Validators.required]],
    });
    if (this.user == undefined) {
      this.addUserForm.addControl('password', this._formBuilder.control(''));
    }
    // console.log(this.addUserForm);
    // console.log(this.user);
  }

  addUser() {
    console.log(this.addUserForm.value);
    if (this.addUserForm.valid) {
      this.SubUserService.addSubUser(this.addUserForm.value).subscribe({
        next: (respone) => {
          console.log(respone);
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else if (this.addUserForm.invalid) {
      console.log('form unvalid');
      return;
    }
  }

  updateUser() {
    if (this.addUserForm.valid) {
      this.SubUserService.updateSubUser(
        this.addUserForm.value,
        this.user.id
      ).subscribe({
        next: (respone) => {
          console.log(respone);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else if (this.addUserForm.invalid) {
      console.log('form unvalid');
      return;
    }
  }
}
