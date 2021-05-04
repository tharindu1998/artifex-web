import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ActivationService {
  public keyToUAAUrl = 'uaa/api/activate'
  constructor(
    private http : HttpClient
  ) { 


  }


  keyToUAA(key):Observable<HttpResponse<any>>{
    return this.http.get<any>(this.keyToUAAUrl,{
      
      params:{
        key: key
      },
      
      observe:'response'})
  }
}
