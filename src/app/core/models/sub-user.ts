export interface SubUser {
  firstName: string;
  lastName: string;
  fullName: string;
  emailAddress: string;
  userId: string;
  user: User;
  phoneNumber: string;
  roleId: string;
  role: Role;
  createdBy: any;
  lastUpdatedBy: any;
  id: string;
  createdAt: string;
  lastUpdatedAt: string;
  timeZoneOffset: number;
  password: string;
}

interface User {
  firstName: string;
  lastName: string;
  fullName: string;
  emailAddress: any;
  phoneNumber: any;
  companyName: any;
  whatsappPhoneNumberId: any;
  whatsappAccountId: any;
  whatsappClientSecret: any;
  userStateId: any;
  whatsappWebhookToken: any;
  userState: any;
  isOnline: boolean;
  createdBy: any;
  lastUpdatedBy: any;
  id: any;
  createdAt: string;
  lastUpdatedAt: string;
  timeZoneOffset: number;
}

interface Role {
  name: string;
  permissions: any;
  id: any;
  createdAt: string;
  lastUpdatedAt: string;
  timeZoneOffset: number;
}
