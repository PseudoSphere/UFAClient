import { Component, OnInit } from '@angular/core';

// Globals
import { UserControlService } from '../../globals/user-control.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private userControl: UserControlService
  ) { }

  ngOnInit() {
  }

}
