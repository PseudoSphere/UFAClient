import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: user;
  error: error;

  constructor(
    private router: Router
  ) {
    this.user = {
      name:"",
      password:""
    }
    this.error = {
      message: "Error"
    }
  }

  ngOnInit() {
  }

  register() {
    console.log("Username: " + this.user.name + 
      ", Password: " + this.user.password);
    
    // Placeholder password validation
    if(this.user.password == "password") {
      this.router.navigate(['/']);
    }
    else {
      this.error.display = true;
    }
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