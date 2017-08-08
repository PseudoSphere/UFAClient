import { Injectable } from '@angular/core';

@Injectable()
export class UserControlService {
  loggedIn: Boolean;
  token: String;
  username: String;

  constructor() {
    this.loggedIn = false;
  }

  logout() {
    this.token = null;
    this.username = null;
    this.loggedIn = false;
  }
}
