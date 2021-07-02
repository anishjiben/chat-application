import { ChatService } from './../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public users: Array<User> = [];
  public selectedUser: User;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  private getAllUsers(): void {
    this.chatService.setCurrentUser(localStorage.getItem('uid'));
    this.chatService.getUsers().pipe(
      map(actions => {
        return actions.map((a: any) => {
          let data = a.payload.doc.data();
          return { ...data }
        })
      })
    ).subscribe((data: Array<User>) => {
      this.users = data.filter((user: User) => {
        if (user.uid !== this.chatService.currentUser.uid) {
          return user;
        }
      });
      if (this.users.length > 0) {
        this.onUserSelected(this.users[0]);
      }
    })
  }

  public onUserSelected(selectedUser: User): void {
    this.selectedUser = selectedUser;
  }

}
