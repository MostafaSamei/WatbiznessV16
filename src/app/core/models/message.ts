export interface message {
  chatId: string,
  content: string,
  fileUrl: string,
  fileType: string,
  sentByUser: boolean,
  createdAt: string
}

export interface createMessage {
  chatId: string,
  file: File,
  content: string
}
