import { Component, OnInit } from '@angular/core';
import { EscortService } from 'src/app/services/escort.service';
import { Person, Escorts } from 'src/app/model/escort';

@Component({
  selector: 'app-escort-list',
  templateUrl: './escort-list.component.html',
  styleUrls: ['./escort-list.component.css']
})
export class EscortListComponent implements OnInit {
  constructor(private escorts: EscortService) { }
  model: Person[];

  ngOnInit() {
    this.escorts.findAll().subscribe((data:  Escorts) => {
      console.log('inside EscortListComponent')
      this.model  =  data._embedded.person;
      console.log(this.model);
  });
  }

}
