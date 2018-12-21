import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { User } from './mock/user.model';
import { USERS } from './mock/users.mock';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersData = new BehaviorSubject<User[]>(USERS);
  users = this.usersData.asObservable();

  private currentUserData = new Subject<User>();
  currentUser = this.currentUserData.asObservable();

  constructor() { }

  getUsers(): Observable<User[]> {
    return this.users;
  }

  getCurrentUser(): Observable<User> {
    return this.currentUser;
  }

  updateCurrentUser(user: User): void {
    this.currentUserData.next(user);
  }

  // submitForm(user: User) {
  //   this.isEdit.value ? this.updateUser(user) : this.addUser(user);
  // }

  // updateUser(user: User) {
  //   this.users.next([
  //     ...this.users.value.map(el => {
  //       if (el.id === user.id) {
  //         return user;
  //       }
  //       return el;
  //     })
  //   ]);
  // }

  // addUser(user: User): void {
  //   const newUsers = [...this.users.value];
  //   newUsers.push(user);
  //   this.users.next(newUsers);
  // }

  // generateUserId() {
  //   const newId = Math.floor(Math.random() * 100);
  //   this.users.value.forEach(el => {
  //     if (el.id === newId) {
  //       console.log(newId);
  //     } else {
  //       return newId;
  //     }
  //   });
  // }

}
