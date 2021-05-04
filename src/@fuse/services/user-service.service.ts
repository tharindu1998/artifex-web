import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private resourceUrl = environment.services_prefix+ "userprofile/api/user/_search";

  constructor(
    private http: HttpClient
  ) { }

  searchByName(req): Observable<HttpResponse <any> >{ 
    return this.http.get<any>(`${this.resourceUrl}/${req}`, {observe: 'response'});
}
}
