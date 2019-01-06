import { Component, OnInit } from '@angular/core';
import { EscortService } from 'src/app/services/escort.service';
import { Escorts } from 'src/app/model/escort';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dynamicdata: any = {};
  private baseurl: string ='http://localhost:9000/upload/';
  model: any = {};
  constructor(private escorts: EscortService,private router: Router) { }

  ngOnInit() {
    this.escorts.findAll().subscribe((data:  Escorts) => {
      this.dynamicdata  =  data;
      console.log(this.dynamicdata);
    
  });
 
  }
  onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  }






}
