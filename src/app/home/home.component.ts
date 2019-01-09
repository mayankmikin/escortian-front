import { Component, OnInit,Input  } from '@angular/core';
import { EscortService } from '../services/escort.service';
import { Escorts, Person } from '../model/escort';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import { SelectedFacets, SelectedCategory } from '../model/filtering';
import { Utils } from '../model/utils';
import { Facets } from '../model/facets';



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
 // facets: any[];
  facets:Facets= new Facets();
  pages:number;
  pagesize:number;
  modelsize:number;
  currentPage:number;
  //initializing p to one
  p: number = 1;
  public isFirstCollapsed = true;
  public isSecondCollapsed = true;
  ngOnInit() {
    this.currentPage=1;
    this.escorts.findAll().subscribe((data:  Escorts) => {
      this.model  =  data._embedded.person;
      this.modaldatafull=data._embedded.person;
      console.log('escort list model array is ');
      console.log(this.model);
      this.pages= Math.ceil((this.model.length)/this.pagesize);
      //console.log('pages are: '+this.pages);
      this.modelsize=this.model.length;
      this.pagesize=9;

      this.escorts.findFacets().subscribe((data:  any) => {
        this.facets.agg_keyword_facet  =  data.aggregations.agg_keyword_facet.facet_name.buckets;
        this.facets.agg_keyword_long_facet  =  data.aggregations.agg_keyword_long_facet.facet_name.buckets;
        this.facets.agg_keyword_multi_facet  =  data.aggregations.agg_keyword_multi_facet.facet_name.buckets;
        console.log('facet data is');
        console.log(data);
    });

  });

  // adding empty arrays
  //console.log('init value for selectedFacets is');
  this.selectedFacets.categories=[]
    //console.log(this.selectedFacets);
 
  }
 
  closeResult: string;
  modaldata:any;
  modaldatafull:any;
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

  // Filtering 
   tempArr:any=[];
  selectedFacets: SelectedFacets= new SelectedFacets()
  onChangeCategory(event, cat: any, subcat: any){ // Use appropriate model type instead of any
   this.model= Utils.filtering(this.selectedFacets,cat,subcat,this.modaldata,this.modaldatafull,this.model)
  }


  
}
