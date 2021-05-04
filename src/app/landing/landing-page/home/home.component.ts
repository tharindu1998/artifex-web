import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { RouterLink, Router } from '@angular/router';
import { LoginModalService, Principal, Account, UserRouteAccessService, StateStorageService } from 'app/core';
import { rootRenderNodes } from '@angular/core/src/view';
// import { Image64 } from './image64';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
// import undefined = require('firebase/empty-import');
// import * as data from './image64.json';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class HomeComponent implements OnInit {

    account: Account;
    public getJSON(): Observable<any> {
        return this.http.get('./assets/image64.json');
    }

    ngOnInit() {
        setTimeout(() => {
            this.getJSON().subscribe(data => {


                setInterval(() => {
                    this.img1 = this.sanitizer.bypassSecurityTrustStyle('url( ' + data[Number(this.getRandomArbitrary(0, 26)).toFixed(0)] + ')');
                }, 5000);

                setInterval(() => {
                    this.img2 = this.sanitizer.bypassSecurityTrustStyle('url( ' + data[Number(this.getRandomArbitrary(0, 26)).toFixed(0)] + ')');
                }, 7500);
                setInterval(() => {
                    this.img3 = this.sanitizer.bypassSecurityTrustStyle('url( ' + data[Number(this.getRandomArbitrary(0, 26)).toFixed(0)] + ')');
                }, 6800);

                setInterval(() => {
                    this.img4 = this.sanitizer.bypassSecurityTrustStyle('url( ' + data[Number(this.getRandomArbitrary(0, 26)).toFixed(0)] + ')');
                }, 8100);
                setInterval(() => {
                    this.img5 = this.sanitizer.bypassSecurityTrustStyle('url( ' + data[Number(this.getRandomArbitrary(0, 26)).toFixed(0)] + ')');
                }, 5850);
                this.timer = setInterval(() => {
                    this.img6 = this.sanitizer.bypassSecurityTrustStyle('url( ' + data[Number(this.getRandomArbitrary(0, 26)).toFixed(0)] + ')');
                }, 6800);


            });

        }, 2000);


        this.principal.identity().then(account => {

            this.account = account;
            

            this.principal.authenticate(account);


            if (this.principal.isAuthenticated()) {
try {
                if (typeof account.id === 'undefined') {

                    environment.uid = account.id;
                }

            } catch (error) {

            }
                this.router.navigate(['/boards/artden']);
            }

        });

    }


    isAuthenticated() {

        return this.principal.isAuthenticated();

    }

    private interval: any;

    private img2: SafeStyle;
    private img3: SafeStyle;
    private img4: SafeStyle;
    private img5: SafeStyle;
    private img6: SafeStyle;
    private img1: SafeStyle;

    open = false;
    timer;

    constructor(

        private sanitizer: DomSanitizer,
        private router: Router,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private stateStorageService: StateStorageService,
        private http: HttpClient

    ) {


    }


    LetsGo() {

        this.open = true;
        this.router.navigate(['/login']);


    }

    JoinNow() {

        this.router.navigate(['/signup']);

    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }




}



