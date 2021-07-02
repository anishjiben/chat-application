import { Conversation } from './../../models/user-conversation';
import { Message } from './../../models/message';
import { ChatService } from './../../services/chat.service';
import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { Chat } from 'src/app/models/chat';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent {

  @Input()
  set selectedUser(user: User) {
    this.updateChatMessages(user);
  }

  public messages: Array<Message> = [];
  public message: string = '';

  constructor(public chatService: ChatService) { }

  private updateChatMessages(user: User): void {
    if (this.chatService.currentUser.conversations == undefined) {
      this.chatService.currentUser.conversations = [];
    }
    let conversations: Array<Conversation> = [...this.chatService.currentUser.conversations];
    let conversation: Conversation = conversations.find(item => item.uid == user.uid);
    if (conversation) {
      this.chatService.getChat(conversation.chatId).subscribe((chats: Array<Chat>) => {
        this.chatService.chat = chats[0];
        this.messages = this.chatService.chat.messages == undefined ? [] : this.chatService.chat.messages
        return
      })
    } else {
      this.chatService.addNewChat().subscribe(chat => {
        this.chatService.addConvoversation(user);
      })
    }
  }

  public sendMessage(): void {
    if (this.message == '') {
      return
    }
    let msg: Message = {
      senderId: this.chatService.currentUser.uid,
      senderName: this.chatService.currentUser.name,
      timestamp: new Date(),
      content: this.message
    };
    this.message = '';
    this.messages.push(msg);
    this.chatService.pushNewMessage(this.messages).subscribe(delivered => {
      //Aknolegment code here
    });
  }

}
