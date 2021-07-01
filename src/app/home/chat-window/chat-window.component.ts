import { ChatService } from './../../services/chat.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

  @Input()
  set selectedUser(user: User) {
    console.log(user);
    this.updateChatMessages(user);
  }

  messages = [];
  temp = [];
  message = '';

  constructor(public chatService: ChatService) { }

  ngOnInit(): void {
  }

  //Selecting A User from the list (onclick)  to talk
  updateChatMessages(user) {
    // try {
    //   this.helper.closeModal()
    // } catch (e) { console.log(e) }

    if (this.chatService.currentUser.conversations == undefined) {
      //means user has no conversations.
      this.chatService.currentUser.conversations = [];
    }
    let convo = [...this.chatService.currentUser.conversations]; //spread operators for ensuring type Array.
    let find = convo.find(item => item.uid == user.uid); // Check If Its the same person who user has talked to before,
    if (find) { // Conversation Found
      this.chatService.getChat(find.chatId).subscribe(m => {
        this.temp = m;
        // set the service values
        this.chatService.chat = this.temp[0];
        this.messages = this.chatService.chat.messages == undefined ? [] : this.chatService.chat.messages
        // this.showMessages = true;
        // setTimeout(() => {
        //   this.triggerScrollTo() //scroll to bottom
        // }, 1000);
        return
      })
    } else {
      /* User is talking to someone for the very first time. */
      this.chatService.addNewChat().then(async () => { // This will create a chatId Instance.
        // Now we will let both the users know of the following chatId reference
        let b = await this.chatService.addConvo(user); //passing other user info
      })

    }
  }

  /* Sending a  Message */
  sendMessage(): void {
    // If message string is empty
    if (this.message == '') {
      alert('Enter message');
      return
    }
    //set the message object
    let msg = {
      senderId: this.chatService.currentUser.uid,
      senderName: this.chatService.currentUser.name,
      timestamp: new Date(),
      content: this.message
    };
    //empty message
    this.message = '';
    //update
    this.messages.push(msg);
    console.log('list', this.messages);
    this.chatService.pushNewMessage(this.messages).then(() => {
      console.log('sent');
    })
  }

}
