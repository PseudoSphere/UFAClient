import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  image: String;

  constructor() {
    localStorage.setItem('homage', 'http://lorempixel.com/600/100/abstract/');
    this.image = localStorage.getItem('homage');
  }

  ngOnInit() {
  }

}
