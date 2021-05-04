import { Component, OnDestroy, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';
import { LoginService } from 'app/core';
import { Router, NavigationEnd } from '@angular/router';
import { IUserProfilePicture } from 'app/shared/model/userProfile/user-profile-picture.model';
import { MessageService } from 'app/services/message.service';
import { ICreator, Creator } from 'app/shared/model/userProfile/creator.model';
import { JsonPipe } from '@angular/common';
import { MatDialog } from '@angular/material';
import { FriendRequestViewerComponent } from 'app/friend-request-viewer/friend-request-viewer.component';
import { MessageTestService } from 'app/services/messageTest.service';
import { Alert } from 'selenium-webdriver';


@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy, AfterViewInit {
    available: boolean;
    nameText: string;
    messages: any[] = [];
    imageText: string;
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    image: IUserProfilePicture;
    subscription: Subscription;
    creator = new Creator();
    // Private
    private _unsubscribeAll: Subject<any>;

    details : ICreator;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        private loginService: LoginService,
        private router: Router,
        private messageService: MessageTestService,
        private dialog: MatDialog

    ) {
     //  this.creator
        this.messageService.notificationAnnouncedAsCreator$.subscribe(
            res=>{
                if(res.topic==='GET_INITIAL_DATA'){
                    //if(res.message){
                      //  if(res.message){
                       //   alert ("rrs data"+JSON.stringify(res.message.userProfile.firstName));
                            this.creator = res.message
                      //  }
                       
                    //}
                    
                    // alert(" from toolbar : "+JSON.stringify(this.creator))
                }
            }
        )
        this.getUserProfileData();

        // Set the defaults
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon': 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon': 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon': 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.languages = [
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'tr',
                title: 'Turkish',
                flag: 'tr'
            }
        ];

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();


        




    }

    getUserProfileData(){
        this.messageService.pushNotification('REQUEST_USER_PROFILE_DATA')
    }
   

    // getUserData(){

    //     this.messageService.notificationAnnounced$.subscribe(res=>{

    //     if(res.topic === "data"){

    //         this.details = res.message;
    //         this.setData();
    //         // this.nameText = this.details.userProfile.firstName;
    //         // this.imageText ='data:image/png;base64,'+ this.details.userProfilePicture.profilePicture;
    //     }

    //     if(res.topic==="newData") {
    //         alert(JSON.stringify(res.message));
    //         this.imageText = 'data:image/png;base64,'+ res.message.imageUrl;
    //     }

    //   //   alert(JSON.stringify(this.details.userProfilePicture))
    //     });



    // }

    setData(){
        if(this.details.userProfilePicture) {
            this.imageText = this.details.userProfilePicture.imageUrl;
        }
        if(this.details.userProfile) {
            this.nameText = this.details.userProfile.firstName;
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        
        // this.getUserData();
   
       

        // Subscribe to the config changes
        //this.getUserProfileData()
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
               
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, { 'id': this._translateService.currentLang });

      

// if(this.details.userProfilePicture) {
    
//     this.setPicture() ;
// }else{
//     //console.log("Cannot load toolbar image")
// }



        this.messageService.pushNotification('GET_INITIAL_DATA')


    }

    ngAfterViewInit() {
        

    }

    showFriendRequests(){
        this.router.navigate(['/friendRequestMain'])
    }


    setPicture() {

        this.image = this.details.userProfilePicture;
        this.imageText = 'data:image/png;base64,' + this.image.profilePicture;

    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
      //  this.subscription.unsubscribe();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        // Do your search here...
        //console.log(value);
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }

    // tslint:disable-next-line:typedef
    logout() {
        this.loginService.logout();
        localStorage.setItem("ProfPicture","");
        this.router.navigate(['']);
        // this.router.navigate(['']);
        //console.log('Loging out...');
    }

    goBack() {
        this.router.navigate(['settings/general'])
    }
}
