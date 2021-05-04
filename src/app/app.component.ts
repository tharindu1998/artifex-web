import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { navigation } from 'app/navigation/navigation';
import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationTurkish } from 'app/navigation/i18n/tr';
import { Principal, IUser, User } from './core';
import { MessageTestService } from './services/messageTest.service';
import { ProfileService } from './main/boards/profile/profile.service';
import { ICreator } from './shared/model/userProfile/creator.model';
import { MessagingService } from './services/messaging.service';

// declare var payhere: any;

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    user: IUser;
    fuseConfig: any;
    navigation: any;
    userDetails: ICreator;
    message;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseSplashScreenService} _fuseSplashScreenService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {Platform} _platform
     * @param {TranslateService} _translateService
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform,
        private principal: Principal,
        private messageTestService: MessageTestService,
        private profileService: ProfileService,
        private messagingService: MessagingService
    ) {
        // Get default navigation
        this.navigation = navigation;

        // Register the navigation to the service
        this._fuseNavigationService.register('main', this.navigation);

        // Set the main navigation as our current navigation
        this._fuseNavigationService.setCurrentNavigation('main');

        // Add languages
        this._translateService.addLangs(['en', 'tr']);

        // Set the default language
        this._translateService.setDefaultLang('en');

        // Set the navigation translations
        this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

        // Use a language
        this._translateService.use('en');

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix Start
         * ----------------------------------------------------------------------------------------------------
         */

        /**
         * If you are using a language other than the default one, i.e. Turkish in this case,
         * you may encounter an issue where some of the components are not actually being
         * translated when your app first initialized.
         *
         * This is related to ngxTranslate module and below there is a temporary fix while we
         * are moving the multi language implementation over to the Angular's core language
         * service.
         **/

        // Set the default language to 'en' and then back to 'tr'.
        // '.use' cannot be used here as ngxTranslate won't switch to a language that's already
        // been selected and there is no way to force it, so we overcome the issue by switching
        // the default language back and forth.
        /**
         setTimeout(() => {
            this._translateService.setDefaultLang('en');
            this._translateService.setDefaultLang('tr');
         });
         */

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix End
         * ----------------------------------------------------------------------------------------------------
         */

        // Add is-mobile class to the body if the platform is mobile
        if (this._platform.ANDROID || this._platform.IOS) {
            this.document.body.classList.add('is-mobile');
        }

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
        

        
    // payhere.onCompleted = function onCompleted(orderId) {
    //     console.log('Payment completed. OrderID:' + orderId);
    //   };
  
    //   payhere.onDismissed = function onDismissed() {
    //     console.log('Payment dismissed');
    //   };
  
    //   payhere.onError = function onError(error) {
    //     console.log('Error:' + error);
    //   };
  
        

        this.messageTestService.notificationAnnounced$.subscribe(res => {
            if (res.topic === 'REQUEST_USER_PROFILE_DATA') {
                // alert("got here")
                this.messageTestService.pushNotification('GET_USER_PROFILE_DATA', this.userDetails)
            //    this.messageTestService.pushNotificationAsCreator('GET_USER_PROFILE_DATA',this.userDetails);
            }

            if (res.topic === 'REQUEST_USER_DATA_AFTER_UPDATE_PP') {
                if(this.user){
                    this.loadProfileAfterUpdate()
                }
               
            }


            if (res.topic === 'GET_INITIAL_DATA') {
                this.initializeUserData()
            }
        })

        this.messageTestService.notificationAnnouncedAsCreator$.subscribe(
            res=>{
                if(res.topic==='REQUEST_EXACT_USER_DATA') {
                    this.messageTestService.pushNotificationAsCreator('GET_EXACT_USER_DATA',this.userDetails)
                }
            }
        )
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {

                this.fuseConfig = config;

                // Boxed
                if (this.fuseConfig.layout.width === 'boxed') {
                    this.document.body.classList.add('boxed');
                }
                else {
                    this.document.body.classList.remove('boxed');
                }

                // Color theme - Use normal for loop for IE11 compatibility
                for (let i = 0; i < this.document.body.classList.length; i++) {
                    const className = this.document.body.classList[i];

                    if (className.startsWith('theme-')) {
                        this.document.body.classList.remove(className);
                    }
                }

                this.document.body.classList.add(this.fuseConfig.colorTheme);
            });
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
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }


    loadProfileAfterUpdate() {
        this.profileService.getDetails(this.user.id).subscribe(
            res => {
                this.userDetails = res.body;
                this.userDetails.user = this.user;
                this.messageTestService.pushNotification('GET_USER_DATA_AFTER_UPDATE_PP', this.userDetails)
                this.messageTestService.pushNotification('GET_USER_PROFILE_DATA', this.userDetails)
                this.messageTestService.pushNotificationAsCreator('GET_INITIAL_DATA',this.userDetails)
            }, err => {
                // console.log("error in loading after ppicture update again" + JSON.stringify(err))
            }
        )
    }


    clearData(){
        this.user = null;
    }


    initializeUserData() {
        this.user = new User();
 
        this.principal.identity().then(
            account => {
                this.user = account;
                if (this.user) {

                    const userId = this.user.id;
                    this.messagingService.requestPermission(userId);
                    this.messagingService.receiveMessage()
                    this.message = this.messagingService.currentMessage
                    
                    this.profileService.getDetails(this.user.id).subscribe(
                        res => {
                            this.userDetails = res.body;
                            this.userDetails.user = account;
                            // alert(JSON.stringify(this.userDetails))

                            this.messageTestService.pushNotification('GET_USER_PROFILE_DATA', this.userDetails);
                            this.messageTestService.pushNotificationAsCreator('GET_INITIAL_DATA',this.userDetails);
                            // alert("in app service")

                            // this.setProfileDetails();
                            //alert(JSON.stringify(this.userDetails));

                        },
                        err => {
                            // alert("Cannot get details");
                        }
                    )
                }

                // alert("App component user" + JSON.stringify( this.user))
            }
        )

    }


    
}
