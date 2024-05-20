import { ClientsService } from 'src/app/core/services/clients.service';
import { Component } from '@angular/core';
import { TemplateService } from 'src/app/core/services/template.service';
import { Template } from 'src/app/core/models/template';
import { client } from 'src/app/core/models/client';
import { NgFor } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-new-broadcast',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './new-broadcast.component.html',
  styleUrls: ['./new-broadcast.component.scss'],
})
export class NewBroadcastComponent {
  templates: Template[] = [];
  clients: client[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private templatesService: TemplateService,
    private clientService: ClientsService
  ) {}
  ngOnInit() {
    this.getTemplates();
    this.getClients();
  }
  newTemplate!: Template;
  NewBroadCast: FormGroup = this._formBuilder.group({
    emailAddress: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  getTemplates() {
    this.templatesService.getTemplates().subscribe({
      next: (resp) => {
        this.templates = resp;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getClients() {
    this.clientService.getClients().subscribe({
      next: (resp) => {
        this.clients = resp;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addBroadcast() {}
  // addBroadcast() {
  //   if (this.NewBroadCast.invalid) {
  //     return;
  //   } else if (this.NewBroadCast.valid) {
  //     this.newTemplate = this.NewBroadCast.value;
  //     this.loginservice.login(this.newTemplate).subscribe({
  //       next: (response: LoginResponse) => {
  //         sessionStorage.setItem('currentUser', JSON.stringify(response));
  //         // sessionStorage.setItem('toast', 'true');
  //         // this.authService.setCurrentUser(user);
  //         // this.spinner.hide('loading');
  //         this.router.navigate(['/']);
  //       },
  //       error: (err) => {
  //         console.log(err);
  //         // this.toastService.show(data.data, { classname: 'bg-danger text-white', delay: 15000 });
  //         // this.error = err;
  //       },
  //       complete: () => {
  //         this.spinner.show('login');
  //         setTimeout(() => {
  //           this.spinner.hide('login');
  //         }, 500);
  //       },
  //     });
  // }
}
