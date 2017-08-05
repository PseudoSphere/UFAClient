import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean = false;
  constructor() { }

  login(){
    console.log('test');
    this.loggedIn = true;
  }
  
  logout(){
    this.loggedIn = false;
  }

  ngOnInit() {
  }

}
