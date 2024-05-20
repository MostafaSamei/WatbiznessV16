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
import { Broadcast } from 'src/app/core/models/broadcast';

@Component({
  selector: 'app-new-broadcast',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './new-broadcast.component.html',
  styleUrls: ['./new-broadcast.component.scss'],
})
export class NewBroadcastComponent {
  constructor(
    private _formBuilder: FormBuilder,
    private templatesService: TemplateService,
    private clientService: ClientsService
  ) {}
  method: string;
  broadcase: Broadcast;
  templates: Template[] = [];
  clients: client[] = [];
  newTemplate!: Template;
  NewBroadCast: FormGroup;
  ngOnInit() {
    if (this.method == 'add') {
      this.getTemplates();
      this.getClients();
      this.NewBroadCast = this._formBuilder.group({
        title: ['', [Validators.required]],
        templateId: [1, [Validators.required]],
        clientIds: [[], [Validators.required]],
        sendTime: ['', [Validators.required]],
        timeSpan: ['', [Validators.required]],
      });
    } else if (this.method == 'edit' || this.method == 'view') {
      this.NewBroadCast = this._formBuilder.group({
        title: [this.broadcase.title, [Validators.required]],
        templateId: [this.broadcase.templateId, [Validators.required]],
        clientIds: ['', [Validators.required]],
        sendTime: [this.broadcase.sendTime, [Validators.required]],
        timeSpan: [this.broadcase.timeSpan, [Validators.required]],
      });
    }
  }

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
  addBroadcast() {
    console.log(this.NewBroadCast.value);
  }
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
