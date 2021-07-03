import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  @Input()
  set usersList(users: Array<User>) {
    this.users = users;
    if (users.length > 0) {
      this.selectedUser = users[0];
    }
  };

  @Output()
  userSelected = new EventEmitter<User>();

  public searchText: string;
  public selectedUser: User;
  public users: Array<User> = [];

  public onUserSelected(user: User): void {
    this.selectedUser = user;
    this.userSelected.emit(this.selectedUser);
  }
}
