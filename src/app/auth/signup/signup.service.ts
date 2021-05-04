import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';


@Injectable({ providedIn: 'root' })
export class RegisterService {
    
    constructor(private http: HttpClient) {}
    // environment.services_prefix +
    private resourceUrl =  '/uaa/api/register';

    save(account: any): Observable<any> {
        return this.http.post(this.resourceUrl, account, {observe: 'response'});
    }

 
}
