import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'

import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild(NavbarComponent) private navbar: NavbarComponent;
  
  user: user;
  error: error;

  constructor(
    private router: Router,
  ) {
    this.user = {
      name:"",
      password:""
    }
    this.error = {
      message: "Incorrect Username or Password."
    }
  }

  ngOnInit() {
  }

  login() {
    console.log("Username: " + this.user.name + 
      ", Password: " + this.user.password);
    
    // Placeholder validation
    if(this.user.password == "password") {
      console.log(this.navbar);
      this.router.navigate(['/']);
      
    }
    else {
      this.error.display = true;
    }
  }

  hideMessage() {
    this.error.display = false;
  }

}

interface error {
  display?: boolean;
  message: string;
}

interface user {
  name: string;
  password: string;
}
