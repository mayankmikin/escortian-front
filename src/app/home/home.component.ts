import { Component, OnInit } from '@angular/core';
import { EscortService } from '../services/escort.service';
import { Escorts, Person } from '../model/escort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private escorts: EscortService) { }

  private baseurl: string ='http://localhost:9000/upload/';
  model: Person[];

  ngOnInit() {
    this.escorts.findAll().subscribe((data:  Escorts) => {
      this.model  =  data._embedded.person;
      console.log(this.model);
  });
  }

}
