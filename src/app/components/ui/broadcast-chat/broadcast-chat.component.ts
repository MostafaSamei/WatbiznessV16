import { Component } from '@angular/core';
import { TemplateService } from 'src/app/core/services/template.service';
import {
  LanguageEnum,
  Template,
  TemplateCategoryEnum,
  TemplateStatusEnum,
  TemplateSubCategoryEnum,
} from 'src/app/core/models/template';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-broadcast-chat',
  standalone: true,
  imports: [NgFor, DatePipe],
  templateUrl: './broadcast-chat.component.html',
  styleUrls: ['./broadcast-chat.component.scss'],
})
export class BroadcastChatComponent {
  constructor(private templatesService: TemplateService) {}
  templates: Template[] = [];
  ngOnInit() {
    this.getTemplates();
  }
  getTemplates() {
    this.templatesService.getTemplates().subscribe({
      next: (resp) => {
        this.templates = resp;
        console.log(resp);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  protected readonly TemplateCategoryEnum = TemplateCategoryEnum;
  protected readonly TemplateSubCategoryEnum = TemplateSubCategoryEnum;
  protected readonly TemplateStatusEnum = TemplateStatusEnum;
  protected readonly LanguageEnum = LanguageEnum;
}
