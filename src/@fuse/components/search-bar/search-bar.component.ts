import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpResponse, HttpClient } from '@angular/common/http';

import { FuseConfigService } from '@fuse/services/config.service';
import { UserServiceService } from '@fuse/services/user-service.service';
import { NavigationExtras, Router } from '@angular/router';
import { MessageService } from 'app/services/message.service';
import { MessageTestService } from 'app/services/messageTest.service';

@Component({
    selector: 'fuse-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class FuseSearchBarComponent implements OnInit, OnDestroy {
    chat: boolean
    searchClick: boolean;
    collapsed: boolean;
    fuseConfig: any;
    searchResult = new Map();

    @Output()
    input: EventEmitter<any>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private userService: UserServiceService,
        private router: Router,
        private messageService: MessageService,
        private messageTestService: MessageTestService
    ) {
        // Set the defaults
        this.input = new EventEmitter();
        this.collapsed = true;

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

        this.chat = false;
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (config) => {
                    this.fuseConfig = config;
                    this.searchClick = false;
                }
            );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Collapse
     */
    collapse(): void {
        this.collapsed = true;
        this.searchClick = false;
    }

    /**
     * Expand
     */
    expand(): void {
        this.collapsed = false;
        this.searchClick = true;
    }

    /**
     * Search
     *
     * @param event
     */
    search(search: string,type?) {
        if(type==='chat'){
            this.chat = true;
        }
        if (search.length > 0)
            this.userService.searchByName(search).subscribe(
                res => {
                    this.searchResult = res.body;
                    console.log('result' + JSON.stringify(res.body));
                },
                err => {
                    console.log(JSON.stringify(err));
                }
                // this.userList = res.body;
            );
        // else
        //   this.refresh(); 

        //this.input.emit(event.target.value);
    }

    sendDetail(detail) {


        // this.messageTestService.pushNotification("VIEW_OTHER_PROFILE",detail.userId)

       

        if (this.router.url === '/boards/profile') {
            // let navigationExtras: NavigationExtras = {
            //     queryParams: { "id": detail.userId }

            // };

            this.router.navigateByUrl('/boards/profile/' + detail.userId, { skipLocationChange: false }).then(() =>
                this.router.navigate(['/boards/profile/' + detail.userId]));




        } else {
            console.log(detail.userId);
            let navigationExtras: NavigationExtras = {
                queryParams: { "id": detail.userId }

            };
            this.router.navigate(['/boards/profile'], navigationExtras);
        }
    }



}
