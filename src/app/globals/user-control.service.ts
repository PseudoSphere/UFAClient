import { Injectable } from '@angular/core';
import { Router }from '@angular/router';

@Injectable()
export class UserControlService {
  logged: Boolean;
  token: String;
  username: String;

  constructor(
    private router: Router
  ) {
    this.logged = false;
  }

  loggedIn() {
    if(localStorage.getItem('logged') == 'true'){
      return true;
    } else {
      return false;
    }
  }

  login(username, token) {
    localStorage.setItem('logged','true');
    this.router.navigate(['/profile']);

    this.setToken(token);
    this.setUsername(username);
  }

  logout() {
    localStorage.clear();
    this.username = null;
    this.token = null;
    this.logged = false;
  }

  canActivate() {
    if(this.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  getToken(){
    return localStorage.getItem('token');
  }
  setToken(token){
    localStorage.setItem('token', token);
  }
  getUsername(){
    return localStorage.getItem('username');
  }
  setUsername(username){
    localStorage.setItem('username',username);
    this.username = username;
  }
}
