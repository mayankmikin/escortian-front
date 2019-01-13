import { Component, OnInit,Input  } from '@angular/core';
import { EscortService } from '../services/escort.service';
import { Escorts, Person } from '../model/escort';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import { SelectedFacets, SelectedCategory } from '../model/filtering';
import { Utils } from '../model/utils';
import { Facets } from '../model/facets';
import { ignoreElements } from 'rxjs/operators';
import { elementStart } from '@angular/core/src/render3';
import { Options, ChangeContext, PointerType } from 'ng5-slider';


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
  public isFilterCollapsed=true;
  public isPaginationdisabled=false;

  // for disbaling pagination 
  showall(isPaginationdisabled){
    this.isPaginationdisabled=!isPaginationdisabled
    console.log('pagination disabled')
    console.log(this.isPaginationdisabled)
    if(this.isPaginationdisabled)
    {
      this.model=this.modaldatafull
      this.pagesize=this.modelsize
    }
    else
    {
      this.pagesize=9;
    }
    

  }

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


  // slider configurations 
  //age
  logText: string = '';
      ageslider: RangeSliderModel = {
        minValue: 18,
        maxValue: 30,
        options: {
          floor: 18,
          ceil: 50
        }
      };

      heightslider: SimpleSliderModel  = {
        value: 5.0,
        options: {
          floor: 5.0,
          ceil: 6.6,
          //showTicks: true,
          step: 0.1,
         
        }
      };
      pricehalfhourslider: RangeSliderModel = {
        minValue: 100,
        maxValue: 300,
        options: {
          floor: 100,
          ceil: 5000,
          translate: (value: number): string => {
            return '€' + value;
          }
        }
      };
      priceperhourslider: RangeSliderModel = {
        minValue: 100,
        maxValue: 300,
        options: {
          floor: 100,
          ceil: 5000,
          translate: (value: number): string => {
            return '€' + value;
          }
        }
      };
      pricetwohourslider: RangeSliderModel = {
        minValue: 100,
        maxValue: 300,
        options: {
          floor: 100,
          ceil: 5000,
          translate: (value: number): string => {
            return '€' + value;
          }
        }
      };
      weightslider: RangeSliderModel = {
        minValue: 50,
        maxValue: 65,
        options: {
          floor: 40,
          ceil: 100,
          translate: (value: number): string => {
            return 'kg ' + value;
          }
        }
      };
      onUserChangeEnd(changeContext: ChangeContext): void {
        this.logText += `onUserChangeEnd(${this.getChangeContextString(changeContext)})\n`;
        console.log(this.logText)
      }
      getChangeContextString(changeContext: ChangeContext): string {
        return `{pointerType: ${changeContext.pointerType === PointerType.Min ? 'Min' : 'Max'}, ` +
               `value: ${changeContext.value}, ` +
               `highValue: ${changeContext.highValue}}`;
      }

  


}

interface SimpleSliderModel {
  value: number;
  options: Options;
}
interface RangeSliderModel {
  minValue: number;
  maxValue: number;
  options: Options;
}