import { Injectable } from '@angular/core';
import { Router }from '@angular/router';

@Injectable()
export class UserControlService {
  loggedIn: Boolean;
  token: String;
  username: String;

  constructor(
    private router: Router
  ) {
    this.loggedIn = false;
  }

  logout() {
    this.token = null;
    this.username = null;
    this.loggedIn = false;
  }

  canActivate() {
    if(this.loggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
