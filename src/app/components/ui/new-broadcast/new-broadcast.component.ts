import { BroadcastService } from 'src/app/core/services/broadcast.service';
import { Component, Input } from '@angular/core';
import { TemplateService } from 'src/app/core/services/template.service';
import { Template } from 'src/app/core/models/template';
import { client } from 'src/app/core/models/client';
import { NgFor, NgIf } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Broadcast } from 'src/app/core/models/broadcast';

@Component({
  selector: 'app-new-broadcast',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, NgIf],
  templateUrl: './new-broadcast.component.html',
  styleUrls: ['./new-broadcast.component.scss'],
})
export class NewBroadcastComponent {
  constructor(
    private _formBuilder: FormBuilder,
    private templatesService: TemplateService,
    private BroadcastService: BroadcastService
  ) {}

  broadcase: Broadcast;
  templates: Template[] = [];
  @Input() clients: client[] = [];
  newTemplate!: Template;
  NewBroadCast: FormGroup;
  ngOnInit() {
    console.log('hello from new');
    this.getTemplates();
    this.NewBroadCast = this._formBuilder.group({
      title: ['', [Validators.required]],
      templateId: [1, [Validators.required]],
      clientIds: new FormArray(
        this.clients.map((client) => new FormControl(false))
      ),
      sendTime: [null],
      timeSpan: [null],
      timeOption: ['now', [Validators.required]],
    });
  }

  getTemplates() {
    this.templatesService.getTemplatesNoPagation().subscribe({
      next: (resp) => {
        this.templates = resp;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getClientsIds() {
    let allresultArr = this.NewBroadCast.get('clientIds')['controls'].map(
      (item) => {
        return item.value;
      }
    );
    let indexs = [];
    for (let i = 0; i < allresultArr.length; i++) {
      if (allresultArr[i] == true) {
        indexs.push(i);
      }
    }
    let formSelectedClientsIds = indexs.map((index) => {
      return this.clients[index].id;
    });
    return formSelectedClientsIds;
  }
  addBroadcast() {
    console.log(this.NewBroadCast.value);
    // console.log(this.getClientsIds());

    if (this.NewBroadCast.invalid) {
      return;
    } else if (this.NewBroadCast.valid) {
      this.BroadcastService.addNewBroadCast(
        this.NewBroadCast.get('title').value,
        this.NewBroadCast.get('templateId').value,
        this.getClientsIds(),
        this.NewBroadCast.get('sendTime').value,
        this.NewBroadCast.get('timeSpan').value
      ).subscribe({
        next: (resp) => {
          console.log(resp);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
