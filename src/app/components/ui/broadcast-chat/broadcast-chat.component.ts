import { Component } from '@angular/core';
import { TemplateService } from 'src/app/core/services/template.service';
import {
  LanguageEnum,
  Template,
  TemplateCategoryEnum,
  TemplateStatusEnum,
  TemplateSubCategoryEnum,
} from 'src/app/core/models/template';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-broadcast-chat',
  standalone: true,
  imports: [NgFor, DatePipe, NgIf, NgxPaginationModule],
  templateUrl: './broadcast-chat.component.html',
  styleUrls: ['./broadcast-chat.component.scss'],
})
export class BroadcastChatComponent {
  constructor(private templatesService: TemplateService) {}
  paginationDetails: any = {
    PageSize: 5,
    CurrentPage: 1,
    TotalCount: 0,
    TotalPages: 0,
  };
  templates: Template[] = [];
  ngOnInit() {
    this.getTemplates();
  }
  getTemplates(pageSize = 5, pageNumber = 1) {
    this.templatesService.getTemplates(pageSize, pageNumber).subscribe({
      next: (resp) => {
        this.templates = resp.body;

        this.paginationDetails = JSON.parse(resp.headers.get('Pagination'));
        console.log(this.templates);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  pageSizeChanged($event) {
    console.log($event.target.value);
    this.getTemplates($event.target.value);
  }
  previousPage() {
    this.getTemplates(
      this.paginationDetails.PageSize,
      this.paginationDetails.CurrentPage - 1
    );
  }
  nextPage() {
    this.getTemplates(
      this.paginationDetails.PageSize,
      this.paginationDetails.CurrentPage + 1
    );
  }
  syncTemplates() {
    this.templatesService.syncTemplates().subscribe({
      next: (resp) => {
        console.log('success');
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
