import { client } from './client';
import { Template } from './template';

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
  clients: client[];
}
