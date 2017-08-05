import { Component, OnInit } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  timeFrame: number = 30;
  showTable: boolean = false;
  table: any[];
  constructor(private http:Http) {  
    this.getData();
  }

  ngOnInit() {
  }

  getData() {
    this.showTable = true;

    // HTTP request
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    var response = this.http.get(
      '/data/' + this.timeFrame,
      {headers});

    response
      .map(n => n.json())
      .subscribe(
        data => this.table = data,
        err => console.log("Error", err),
        () => console.log("Data Recieved."));
  }

}
