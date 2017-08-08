import { Component, OnInit } from '@angular/core';

//Globals
import { UserControlService } from '../../globals/user-control.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    private userControl: UserControlService
  ) { }

  ngOnInit() {
  }

}
