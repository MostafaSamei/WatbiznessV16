import { ClientsService } from 'src/app/core/services/clients.service';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { client } from 'src/app/core/models/client';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-new-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss'],
})
export class NewContactComponent {
  constructor(
    private _formBuilder: FormBuilder,
    private ClientsService: ClientsService
  ) {}

  @Input() client: client;
  @Input() method: string;

  addClientForm: FormGroup;

  ngOnInit() {
    if (this.client != null) {
      this.addClientForm = this._formBuilder.group({
        name: [this.client.name, [Validators.required]],
        phoneNumber: [this.client.phoneNumber, [Validators.required]],
      });
    } else {
      this.addClientForm = this._formBuilder.group({
        name: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
      });
    }
  }

  submitForm() {
    if (this.method == 'add') {
      this.addClient();
    } else if (this.method == 'edit') {
      this.updateClient();
    }
  }
  addClient() {
    if (this.addClientForm.valid) {
      this.ClientsService.addClient(this.addClientForm.value).subscribe({
        next: (respone) => {
          console.log(respone);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else if (this.addClientForm.invalid) {
      console.log('form unvalid');
      return;
    }
  }
  updateClient() {
    if (this.addClientForm.valid) {
      this.ClientsService.updateClient(
        this.addClientForm.value,
        this.client.id
      ).subscribe({
        next: (respone) => {
          console.log(respone);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else if (this.addClientForm.invalid) {
      console.log('form unvalid');
      return;
    }
  }
}
