import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
    constructor(private http: HttpClient) {}

    // tslint:disable-next-line:typedef
    getToken() {
        return null;
    }

    login(credentials): Observable<any> {
        const data = {
            username: credentials.username,
            password: credentials.password,
            rememberMe: credentials.rememberMe
        };
        return this.http.post( 'auth/login', data, {});
    }

    // tslint:disable-next-line:typedef
    loginWithToken(jwt, rememberMe) {
        if (jwt) {
            this.storeAuthenticationToken(jwt, rememberMe);
            return Promise.resolve(jwt);
        } else {
            return Promise.reject('auth-jwt-service Promise reject'); // Put appropriate error message here
        }
    }

    // tslint:disable-next-line:typedef
    storeAuthenticationToken(jwt, rememberMe) {}

    logout(): Observable<any> {
        return this.http.post( 'auth/logout', null);
    }
}
