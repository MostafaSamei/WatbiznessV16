export interface Broadcast {
  sendTime: string;
  timeSpan: string;
  title: string;
  userId: string;
  user: any;
  templateId: string;
  template: Template;
  successful: number;
  replied: number;
  recipients: number;
  failed: number;
  isCompleted: boolean;
  isSendTimeNow: boolean;
  createdBy: any;
  lastUpdatedBy: any;
  id: string;
  createdAt: string;
  lastUpdatedAt: string;
  timeZoneOffset: number;
}

export interface Template {
  userId: any;
  user: any;
  name: string;
  message: any;
  whatsappTemplateId: any;
  language: number;
  templateCategory: number;
  templateSubCategory: any;
  templateStatus: number;
  id: any;
  createdAt: string;
  lastUpdatedAt: string;
  timeZoneOffset: number;
}
