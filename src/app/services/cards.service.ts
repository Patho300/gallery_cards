import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CardsService {


  constructor( private http:HttpClient,
               private auth:AuthService ) {
        
  }

  private cartas: any[] = [];

  
  getCards(uid:string){
    if( this.cartas.length > 0){
      return of(this.cartas);
    }else{
      return this.http.get(`https://cards-1b410.firebaseio.com/RECORDS.json`);
    }
   
    
   //return this.http.get(`https://cards-1b410.firebaseio.com/RECORDS.json?auth=${ uid }`);

  }

}

