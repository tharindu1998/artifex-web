import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class AccountService {
    constructor(private http: HttpClient ) { }

    get(): Observable<HttpResponse<Account>> {
        return this.http.get<Account>(environment.services_prefix + 'uaa/api/account', { observe: 'response' });
    }

    save(account: any): Observable<HttpResponse<any>> {
        return this.http.post( environment.services_prefix + 'uaa/api/account', account, { observe: 'response' });
    }
}
