import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw'; 
import { HttpClient, HttpErrorResponse ,HttpHeaders} from '@angular/common/http';
import { Escorts } from '../model/escort';

@Injectable({
  providedIn: 'root'
})
export class EscortService {


  private _url: string ='http://localhost:9000/';

	constructor(private http:HttpClient) { }


  //  find(): Product {
  //       return {
  //           id: 'p01',
  //           name: 'name 1',
  //           photo: 'thumb1.gif',
  //           price: 20,
  //           quantity: 3
  //       };
  //   }

    findAll(): Observable<Escorts> {
		return this.http.get<Escorts>(`${this._url}/person`);
                                 
    }
}
