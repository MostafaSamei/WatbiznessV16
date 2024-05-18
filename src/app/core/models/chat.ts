import {client} from "./client";
import {message} from "./message";

export interface chatCalendar
{
  day: string,
  lastMessageDate: string,
  chatData: chat[];
}

export interface groupChat
{
  date: string,
  day: string,
  lastMessageDate: string,
  chats: chat[];
}

export interface chat
{
  id: string;
  userId: string;
  clientId: string;
  client: client;
  lastMessage: message;
  status: chatStatusEnum;
  messages: message[];
}

export enum chatStatusEnum
{
  Active,
  Archived
}
