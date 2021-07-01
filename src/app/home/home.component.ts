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

  users;
  selectedUser;
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.chatService.setCurrentUser(localStorage.getItem('uid')) //setting up the uid in the service for easy access.
    this.chatService.getUsers().pipe(
      map(actions => {
        return actions.map((a: any) => {
          let data = a.payload.doc.data();
          let id = a.payload.doc.id;
          return { ...data }
        })
      })
    ).subscribe(data => {
      console.log('data', data)
      this.users = data.filter((item) => {
        if (item.uid !== this.chatService.currentUser.uid) {
          return item;
        }
      });
      console.log('users : ', this.users);
    })
  }

  public onUserSelected(selectedUser: User) {
    this.selectedUser = selectedUser;
  }

}
