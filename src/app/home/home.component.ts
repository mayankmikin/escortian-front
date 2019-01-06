import { Component, OnInit,Input  } from '@angular/core';
import { EscortService } from '../services/escort.service';
import { Escorts, Person } from '../model/escort';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbPaginationConfig] 
})
export class HomeComponent implements OnInit {

  constructor(private escorts: EscortService,private modalService: NgbModal,
    config: NgbPaginationConfig,
    ) 
  {
      // customize default values of paginations used by this component tree
    //config.size = 'sm';
   // config.pageSize=9;
   //config.boundaryLinks = true;
   // this.pagesize=config.pageSize;
    
  }

  //private baseurl: string ='http://localhost:9000/upload/';
  model: Person[];
  facets: any;
  pages:number;
  pagesize:number;
  modelsize:number;
  currentPage:number;
  //initializing p to one
  p: number = 1;
  ngOnInit() {
    this.currentPage=1;
    this.escorts.findAll().subscribe((data:  Escorts) => {
      this.model  =  data._embedded.person;
      //console.log(this.model);
      this.pages= Math.ceil((this.model.length)/this.pagesize);
      //console.log('pages are: '+this.pages);
      this.modelsize=this.model.length;
      this.pagesize=9;
  });
  this.escorts.findFacets().subscribe((data:  any) => {
    this.facets  =  data;
    console.log(data);
});
  }
 
  closeResult: string;
  modaldata:any;
  showOldPriceslashed:false;
  
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
