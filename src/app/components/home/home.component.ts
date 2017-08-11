import { Component, OnInit } from '@angular/core';

// Globals
import { CCPService } from '../../globals/ccp.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private ccp: CCPService
  ) {}

  ngOnInit() {
  }

}
