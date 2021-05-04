import { Component, OnDestroy, OnInit, ViewEncapsulation, HostListener, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { navigation } from 'app/navigation/navigation';
import { MessageTestService } from 'app/services/messageTest.service';
import { Router } from '@angular/router';

@Component({
    selector: 'vertical-layout-1',
    templateUrl: './layout-1.component.html',
    styleUrls: ['./layout-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VerticalLayout1Component implements OnInit, OnDestroy, AfterViewInit {
    ngAfterViewInit(): void {
    this.messageService.notificationAnnounced$.subscribe(res => {
                if(res.topic==='othersIDforScroll'){
                    this.messageService.pushNotification('profile',   document.getElementById('container-3'));
                }
                if (res.topic === 'scroll-topic') {
                    // alert(res.message)
                    if(this.router.url==='/boards/profile' || this.router.url==='/boards/artden'){
                        this.messageService.pushNotification(res.message,   document.getElementById('container-3'));
                    }
                   
                }
            })

        // document.getElementById('container-3').addEventListener('ps-y-reach-end', () => {
            // alert("There there in the layout 01");

        

            // if(this.router.url==='/boards/artden'){
            // }

            // if (this.router.url === '/boards/profile') {
            //     this.messageService.pushNotification('loadMoreProfile', '');
            // }else if (this.router.url === '/boards/artden') {
            //     this.messageService.pushNotification('loadMoreArtden', '')
            // }

        // })
    }

    fuseConfig: any;
    navigation: any;
    selectedThemeDark = true;
    throttle = 300;
    scrollDistance = 0;
    scrollUpDistance = 2;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private messageService: MessageTestService,
        private router: Router
    ) {
        // Set the defaults
        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {



        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.fuseConfig = config;
                if (
                    this.fuseConfig.colorTheme === 'theme-yellow-dark' ||
                    this.fuseConfig.colorTheme === 'theme-blue-gray-dark' ||
                    this.fuseConfig.colorTheme === 'theme-pink-dark'
                ) {
                    this.selectedThemeDark = true
                } else {

                    this.selectedThemeDark = false
                }
            });



    }

    // @HostListener("window:scroll", ["$event"])
    // onWindowScroll() {
    // //In chrome and some browser scroll is given to body tag
    // var elem = document.getElementById("cons");
    // let pos = (elem.scrollTop || elem.scrollTop) + document.documentElement.offsetHeight;
    // let max = document.documentElement.scrollHeight;
    // // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    //  if(pos == max )   {
    //  //Do your action here
    //  alert("My function")
    //  }
    // }


    // onScrollDown(ev){
    //     alert(ev)
    // }

    // onUp(){

    // }




    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
