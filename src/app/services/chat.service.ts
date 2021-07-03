import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Chat } from '../models/chat';
import { Message } from '../models/message';
import { User } from '../models/user';
import { Conversation } from '../models/user-conversation';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public currentUser: User;
  public otherUser;
  public messages = [];
  public chat: Chat = {
    chatId: '',
    messages: []
  }

  constructor(private afs: AngularFirestore) { }

  public createUser(uid, data): Observable<any> {
    return from(this.afs.doc('users/' + uid).set({
      uid: uid,
      name: data.name,
      email: data.email
    }));
  }

  public setCurrentUser(uid): Observable<User> {
    localStorage.setItem('uid', uid)
    return this.afs.doc('users/' + uid).valueChanges().pipe(
      tap((user: User) => {
        this.currentUser = user
      })
    )
  }

  public getUsers(): Observable<any> {
    return this.afs.collection<User>('users').get();
  }

  public getChat(chatId): Observable<Array<Chat>> {
    return this.afs.collection<Chat>('conversations', ref => ref.where('chatId', '==', chatId)).valueChanges();
  }

  public addConvoversation(user: User): void {
    let userMsg: Conversation = { name: user.name, uid: user.uid, chatId: this.chat.chatId }
    let otherMsg: Conversation = { name: this.currentUser.name, uid: this.currentUser.uid, chatId: this.chat.chatId }
    let myReference = this.afs.doc('users/' + this.currentUser.uid);
    let receiverReference = this.afs.doc('users/' + user.uid);

    myReference.get().subscribe(document => {
      let user = document.data()
      if (!user.conversations) {
        user.conversations = [];
      }
      user.conversations.push(userMsg);
      return myReference.update({ conversations: user.conversations })
    })
    receiverReference.get().subscribe(document => {
      let user = document.data()
      if (!user.conversations) {
        user.conversations = [];
      }
      user.conversations.push(otherMsg);
      return receiverReference.update({ conversations: user.conversations })
    })

  }

  public addNewChat(): Observable<any> {
    const chatId = this.afs.createId();
    return from(this.afs.doc('conversations/' + chatId).set({
      chatId: chatId,
      messages: []
    })).pipe(tap((data: any) => {
      this.chat = {
        chatId: chatId,
        messages: []
      }
    }));
  }

  public updateRecentMessage(message: string, user: User): void {
    let receiverReference = this.afs.doc('users/' + user.uid);
    let myReference = this.afs.doc('users/' + this.currentUser.uid);
    receiverReference.get().subscribe(document => {
      let userDocument = document.data();
      let conversation: Conversation = userDocument.conversations.find((conversation: Conversation) => {
        return conversation.chatId === this.chat.chatId;
      });
      conversation.recentMessage = message;
      conversation.recentMsgTime = new Date();
      return receiverReference.update(userDocument)
    });

    myReference.get().subscribe(document => {
      let userDocument = document.data();
      let conversation: Conversation = userDocument.conversations.find((conversation: Conversation) => {
        return conversation.chatId === this.chat.chatId;
      });
      conversation.recentMessage = message;
      conversation.recentMsgTime = new Date();
      return myReference.update(userDocument)
    });
  }

  public pushNewMessage(list: Array<Message>): Observable<any> {
    return from(this.afs.doc('conversations/' + this.chat.chatId).update(
      { messages: list }
    ));
  }

}
