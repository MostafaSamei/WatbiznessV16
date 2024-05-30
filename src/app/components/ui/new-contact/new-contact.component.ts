import { ClientsService } from 'src/app/core/services/clients.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { client } from 'src/app/core/models/client';
import { NgIf } from '@angular/common';
import {ElementSchemaRegistry} from "@angular/compiler";

@Component({
  selector: 'app-new-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss'],
})
export class NewContactComponent {
  @Output() refreshContactsEvent: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  constructor(private formBuilder: FormBuilder, private ClientsService: ClientsService) {}

  client!: client;
  method: string;

  addClientForm: FormGroup;

  ngOnInit() {
    this.addClientForm = this.formBuilder.group({
      name: [
        { value: '' }, [Validators.required]
      ],
      phoneNumber: [
        {value: ''},[Validators.required],
      ],
    });
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
        complete: () => {
          this.refreshContactsEvent.emit();
        },
      });
    } else if (this.addClientForm.invalid) {
      console.log('form unvalid');
      return;
    }
  }

  updateClient() {
    if (this.addClientForm.valid) {

      this.ClientsService.updateClient(this.addClientForm.value, this.client.id)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.refreshContactsEvent.emit();
          },
      });

    } else if (this.addClientForm.invalid) {
      console.log('form invalid');
      return;
    }
  }

  initializeClient(client: client, method: string) {
    this.client = client;
    this.method = method;

    if (client != null)
      this.addClientForm.patchValue(client)
    else
      this.addClientForm.reset();

    if (method == 'view')
      this.addClientForm.disable();
    else
      this.addClientForm.enable();
  }
}
