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

export enum TemplateCategoryEnum {
  UTILITY = 1,
  MARKETING = 2,
  AUTHENTICATION = 3,
}

export enum TemplateStatusEnum {
  APPROVED = 1,
  IN_APPEAL = 2,
  PENDING = 3,
  REJECTED = 4,
  PENDING_DELETION = 5,
  DELETED = 6,
  DISABLED = 7,
  PAUSED = 8,
  LIMIT_EXCEEDED = 9,
}
export enum TemplateSubCategoryEnum {
  CUSTOM = 1,
  ORDER_DETAILS = 2,
  ORDER_STATUS = 3,
}
export enum LanguageEnum {
  Arabic = 1,
  English = 2,
}
