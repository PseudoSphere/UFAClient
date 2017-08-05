import { Component, OnInit } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-entryform',
  templateUrl: './entryform.component.html',
  styleUrls: ['./entryform.component.css']
})
export class EntryformComponent implements OnInit {
  animals: boxData[];
  displayError: boolean;
  dataInfo: dataInfo;

  constructor(private http:Http) { 
    this.animals = [
      {name:"Chickens", product: "Eggs", dbColumn: "chickenEggs"},
      {name:"Ducks", product: "Eggs", dbColumn: "duckEggs"},
      {name:"Goats", product: "Milk", dbColumn: "goatMilk"}
    ];
    this.dataInfo = {
      show: false
    }
  }

  ngOnInit() {
  }

  // Send data to the server
  inputData() {
    // Keep user updated
    this.dataInfo.show = true;
    this.dataInfo.message = "Sending...";

    // Create and send post request
    let request = {};
    // Loop through each product
    this.animals.forEach(animal => {
        request[animal.dbColumn] = animal.quantity;
    });

    // HTTP request
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    var response = this.http.post(
      '/input',
      request,
      {headers});

    response
      .map(n => n.json())
      .subscribe(
        data => this.dataInfo.message = data.message,
        err => console.log("Error", err),
        () => console.log("Data Transfer Complete"));
  }

  hideMessage() {
    this.dataInfo.show = false;
  }
}

interface dataInfo{
  show: boolean;
  message?: string;
}

// Entry Box Variabls
interface boxData{
  name: string;
  product: string;
  dbColumn?: string;
  quantity?: any;
}