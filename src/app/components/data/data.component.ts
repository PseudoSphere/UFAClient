import { Component, OnInit } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import Chart from 'chart.js';

// Globals
import { UserControlService } from '../../globals/user-control.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  timeFrame: number = 30;
  showTable: boolean = false;
  noData: boolean;
  loading: boolean;
  dataInfo: DataInfo = {show: false};

  // Graph Variabls
  graphLabels: Date[] = [];
  graphCEggs: GraphObject = {data:[], show:true};
  graphDEggs: GraphObject = {data:[], show:true};
  graphGMilk: GraphObject = {data:[], show:true};
  showGraph: Boolean = false;

  // Array for iteration
  idArray: Number[] = [];
  // 
  table: Object = {};
  /* Table Structure
    {
      edit: false,
      delete: false,
      id: row.id,
      data: {
        original: {
          chickenEggs: row.chickenEggs,
          duckEggs: row.duckEggs,
          goatMilk: row.goatMilk
        },
        edited: {
          chickenEggs: row.chickenEggs,
          duckEggs: row.duckEggs,
          goatMilk: row.goatMilk
        }
      }
   */

  constructor(
    private http:Http,
    private userControl: UserControlService
  ) {
  }

  ngOnInit() {
    this.getData();
/*
    let testData = [
      {"ID":68,"date":"2017-08-08","chickenEggs":4,"duckEggs":3,"goatMilk":2,"username":"test"},
      {"ID":69,"date":"2017-08-08","chickenEggs":2,"duckEggs":3,"goatMilk":2,"username":"test"},
      {"ID":71,"date":"2017-08-04","chickenEggs":2,"duckEggs":3,"goatMilk":2,"username":"test"},
      {"ID":70,"date":"2017-08-02","chickenEggs":6,"duckEggs":6,"goatMilk":6,"username":"test"},
      {"ID":72,"date":"2017-07-30","chickenEggs":2,"duckEggs":3,"goatMilk":2,"username":"test"},
      {"ID":73,"date":"2017-05-24","chickenEggs":2,"duckEggs":3,"goatMilk":2,"username":"test"}]
    this.constructTable(testData);
*/
  }

  getData() {
    this.showTable = true;
    if(!this.userControl.loggedIn) {
      return;
    }

    this.loading = true;
    let url = '/data/' + this.userControl.username + '/' + this.timeFrame;
  
    // HTTP request
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('JWT', this.userControl.token.toString());
    
    var response = this.http.get(
      url,
      {headers});

    response
      .map(n => n.json())
      .subscribe(
        data => this.handleIt(data),
        err => console.log("Error", err),
        () => console.log('Data recieved.'));
  }

  // Show/hide various messages and populate the table
  handleIt(data) {
    this.loading = false;
    if(data.dataExists) {
      let table = JSON.parse(data.table);
      this.constructTable(table);
      this.noData = false;
    } else {
      this.noData = true;
    }
  }

  // Construct a table
  constructTable(data) {
    // Reset the Table and Visuals
    this.idArray = [];
    this.table = {};
    this.graphLabels = [];
    this.graphCEggs.data = [];
    this.graphDEggs.data = [];
    this.graphGMilk.data = [];

    data.forEach(row => {
      this.constructElement(row);
    });
    this.buildGraph();
  }

  constructElement(row){
    // Table
    this.idArray.push(row.ID);
    this.table[row.ID] = {
      edit: false,
      delete: false,
      id: row.ID,
      date: row.date,
      data: {
        original: {
          chickenEggs: row.chickenEggs,
          duckEggs: row.duckEggs,
          goatMilk: row.goatMilk
        },
        edited: {
          chickenEggs: row.chickenEggs,
          duckEggs: row.duckEggs,
          goatMilk: row.goatMilk
        }
      }
    }

    // --Graph--
    // Grab label if it exists
    let dateIndex = this.graphLabels.indexOf(row.date)
    // Not yet added
    if(dateIndex < 0) {
      this.graphLabels.push(row.date);
      this.graphCEggs.data.push(row.chickenEggs);
      this.graphDEggs.data.push(row.duckEggs);
      this.graphGMilk.data.push(row.goatMilk);

    // Lable exists, add to the value instead of creating another
    } else {
      this.graphCEggs.data[dateIndex] += row.chickenEggs;
      this.graphDEggs.data[dateIndex] += row.duckEggs;
      this.graphGMilk.data[dateIndex] += row.goatMilk;
    }
  } // <--constructElement

  // HTML manipulation
  editRow(id) {
    this.table[id].edit = true;
  }
  submitEdit(id) {
    let toSend = {
      id, 
      data: this.table[id].data.edited
    };

    // HTTP request
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('JWT', this.userControl.token.toString());
    
    var response = this.http.post(
      '/update',
      toSend,
      {headers});

    response
      .map(n => n.json())
      .subscribe(
        data => this.onComplete(data),
        err => console.log("Error", err),
        () => console.log('Data recieved.'));
  }
  cancelEdit(id) {
    this.table[id].edit = false;
  }
  deleteRow(id) {
    this.table[id].delete = true;
  }
  submitDelete(id) {
    let toSend = {id};

    // HTTP request
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('JWT', this.userControl.token.toString());
    
    var response = this.http.post(
      '/delete',
      toSend,
      {headers});

    response
      .map(n => n.json())
      .subscribe(
        data => this.onComplete(data),
        err => console.log("Error", err),
        () => console.log('Data recieved.'));
  }
  onComplete(data) {
    this.dataInfo.message = data.message;
    this.dataInfo.show = true;
    // Refresh
    this.getData();
  }
  cancelDelete(id){
    this.table[id].delete = false;
  }

  hideMessage() {
    this.dataInfo.show = false;
  }

  // --- Build The Graph ---
  buildGraph() {
    this.showGraph = true;
    var chart = document.getElementById("myChart");
    let data = {
        labels:this.graphLabels,
        datasets: [
            {
              label: "Chicken Eggs",
              fill: false,
              showLine: this.graphCEggs.show,
              borderColor: "#fff",
              pointRadius: 0,
              data: this.graphCEggs.data
            },
            {
              label: "Duck Eggs",
              fill: false,
              showLine: this.graphDEggs.show,
              borderColor: "#555",
              pointRadius: 0,
              data: this.graphDEggs.data
            },
            {
              label: "Goat Milk",
              fill: false,
              showLine: this.graphGMilk.show,
              borderColor: "#888",
              pointRadius: 0,
              data: this.graphGMilk.data
            }
        ]
    };

    let dataChart = new Chart(chart, {
      type:'line',
      data:data,
      options: {}
    });
  }

  // Manipulate Graph Visuals
  updateCEggs() {
    this.graphCEggs.show = !this.graphCEggs.show;
    this.buildGraph();
  }
  updateDEggs() {
    this.graphDEggs.show = !this.graphDEggs.show;
    this.buildGraph();
  }
  updateGMilk(){
    this.graphGMilk.show = !this.graphGMilk.show;
    this.buildGraph();
  }
}

interface DataInfo {
  show: boolean;
  message?: string;
}

interface GraphObject {
  data: Number[];
  show: Boolean;
}