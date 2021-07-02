import { Conversation } from "./user-conversation";

export interface User {
  uid: string,
  name: string,
  email: string,
  conversations?: Array<Conversation>
}
