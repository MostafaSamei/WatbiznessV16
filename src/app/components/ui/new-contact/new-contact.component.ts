import { ClientsService } from 'src/app/core/services/clients.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-new-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss'],
})
export class NewContactComponent {
  constructor(
    private _formBuilder: FormBuilder,
    private ClientsService: ClientsService
  ) {}

  addClientForm: FormGroup = this._formBuilder.group({
    name: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
  });

  addClient() {
    console.log(this.addClientForm.value);
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
}
