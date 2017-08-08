import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

//Globals
import { UserControlService } from '../../globals/user-control.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: user;
  error: error;

  constructor(
    private router: Router,
    private http: Http,
    private userControl: UserControlService
  ) {
    this.user = {
      username:"",
      password:""
    }
    this.error = {
      message: "Error"
    }
  }

  ngOnInit() {
  }

  register() {
    // HTTP request
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    var response = this.http.post(
      '/register',
      this.user,
      {headers});

    response
      .map(n => n.json())
      .subscribe(
        data => this.newData(data),
        err => this.httpErrResponse(err),
        () => console.log("Data Transfer Complete"));
  }

  // Handle new data response
  newData(data) {
    if(data.success) {
      this.userControl.loggedIn = true;
      this.router.navigate(['/profile']);

      this.userControl.username = data.username;
      this.userControl.token = data.token;
    } else {
      this.error.message = data.message;
      this.error.display = true;
    }
  }

  // Handle response with error
  httpErrResponse(err) {
    this.error.message = err.statusText;
    this.error.display = true;
  }
}

interface error {
  display?: boolean;
  message: string;
}

interface user {
  username: string;
  password: string;
}