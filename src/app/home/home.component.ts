import { Component, OnInit,Input  } from '@angular/core';
import { EscortService } from '../services/escort.service';
import { Escorts, Person } from '../model/escort';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private escorts: EscortService,private modalService: NgbModal) 
  {
      
  }

  //private baseurl: string ='http://localhost:9000/upload/';
  model: Person[];
  facets: any;
  ngOnInit() {
    this.escorts.findAll().subscribe((data:  Escorts) => {
      this.model  =  data._embedded.person;
      console.log(this.model);
  });
  this.escorts.findFacets().subscribe((data:  any) => {
    this.facets  =  data;
    console.log(data);
});
  }
 
  closeResult: string;
  modaldata:any;
  open(content,event) {
    console.log('clicked')
    console.log(event)
    this.modaldata=event;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
    .result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    },
     (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  
}
