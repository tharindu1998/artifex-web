import { Injectable } from '@angular/core';

import { Principal } from '../auth/principal.service';
import { AuthServerProvider } from '../auth/auth-jwt.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(private principal: Principal,
        private authServerProvider: AuthServerProvider
        , private router: Router, ) { }

    login(credentials, callback?) {
        const cb = callback || function () { };
        // alert(JSON.stringify(credentials))
        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe(
                data => {
                    console.log("data's are : " + data);
                    this.principal.identity(true).then(account => {
                        // alert("principle.identity : " + JSON.stringify( account));
                        environment.uid = account.id;
                        resolve(data);
                    });
                    return cb();
                },
                err => {
                    this.logout();
                    reject(err);
                    return cb(err);
                }
            );
        });
    }

    logout() {



        if (this.principal.isAuthenticated()) {
            this.authServerProvider.logout().subscribe((res) => {

                this.principal.identity(false);
                this.principal.authenticate(null);

                this.router.navigate(['/login']);
                //  console.log(res.data);
                console.log(res);
            });
            console.log('erasing session');


        } else {
            this.principal.authenticate(null);
        }
    }
}
