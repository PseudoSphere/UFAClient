import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

// Globals
import { UserControlService } from '../../globals/user-control.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  
  user: user;
  error: error;

  constructor(
    private router: Router,
    private http: Http,
    private userControl: UserControlService,
  ) {
    this.user = {
      username:"",
      password:""
    }
    this.error = {
      message: ""
    }
  }

  ngOnInit() {
  }

  login() {
    // HTTP request
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    var response = this.http.post(
      '/login',
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
      this.userControl.login(data.username, data.token);
      this.router.navigate(['/profile']);

    } else {
      this.error.message = data.message;
      this.error.display = true;
    }
  }

  // Handle response with error
  httpErrResponse(err) {
    if(err.statusCode == 404) {
      this.error.message = "Unable to reach server."
    } else {
      this.error.message = err.statusText;
    }
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
