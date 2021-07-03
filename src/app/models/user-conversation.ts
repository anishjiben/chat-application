export interface Conversation {
  uid: string,
  name: string,
  chatId: string,
  timestamp?: Date,
  recentMessage?: string;
  recentMsgTime?: Date;
}
