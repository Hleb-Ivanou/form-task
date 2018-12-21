import { Component, OnInit } from '@angular/core';
import { User } from '../mock/user.model';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users = [];

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this._userService.getUsers()
      .subscribe(users => this.users = users);
  }

  editUser(user: User): void {
    this._userService.updateCurrentUser(user);
  }

  addUser() {

    this._userService.updateCurrentUser(<User>{});
  }

}
