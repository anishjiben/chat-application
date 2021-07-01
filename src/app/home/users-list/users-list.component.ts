import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnChanges {

  @Input()
  usersList = [];

  @Output()
  userSelected = new EventEmitter<User>();

  selectedUser: User;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  onUserSelected(user: User): void {
    this.selectedUser = user;
    this.userSelected.emit(this.selectedUser);
  }

}
