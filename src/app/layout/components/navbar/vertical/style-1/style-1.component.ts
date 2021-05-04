import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Principal, IUser, User } from 'app/core';
import { ProfileService } from 'app/main/boards/profile/profile.service';
import { IUserProfile } from 'app/shared/model/userProfile/user-profile.model';
import { IUserProfilePicture } from 'app/shared/model/userProfile/user-profile-picture.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';
import { MessageService } from 'app/services/message.service';
import { ICreator, Creator } from 'app/shared/model/userProfile/creator.model';
import { runInThisContext } from 'vm';
import { MessageTestService } from 'app/services/messageTest.service';



@Component({
    selector: 'navbar-vertical-style-1',
    templateUrl: './style-1.component.html',
    styleUrls: ['./style-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle1Component implements OnInit, OnDestroy {
    email:string;
    user: IUser;
    fuseConfig: any;
    navigation: any;
    image: IUserProfilePicture;
    imageText: string;
    subscription: Subscription;
    messages: any[] = [];
    userDetails = new Creator();
    displayName: string;
    // Private
    private _fusePerfectScrollbar: FusePerfectScrollbarDirective;
    private _unsubscribeAll: Subject<any>;

    @ViewChild('changeloghint')
    changeloghint: ElementRef;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {Router} _router
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _router: Router,
        private principal: Principal,
        private profileService: ProfileService,
        private router: Router,
        private messageService: MessageTestService

    ) {
        // Set the private defaults
        //  this.getUpdatedProfilePicture();
        this._unsubscribeAll = new Subject();

        this.messageService.notificationAnnounced$.subscribe(
            res=>{
                if(res.topic==='GET_USER_PROFILE_DATA'){
                     this.userDetails = res.message
                    
                    // alert("NAVBAR "+JSON.stringify(this.userDetails))
                }
            },err=>{
                //console.log("error in user getting "+JSON.stringify(err))
            }
        )

      
        // alert(this.changeloghint.nativeElement.offsetWidth);
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Directive
    @ViewChild(FusePerfectScrollbarDirective)
    set directive(theDirective: FusePerfectScrollbarDirective) {
        if (!theDirective) {
            return;
        }

        this._fusePerfectScrollbar = theDirective;

        // Update the scrollbar on collapsable item toggle
        this._fuseNavigationService.onItemCollapseToggled
            .pipe(
                delay(500),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this._fusePerfectScrollbar.update();
            });

        // Scroll to the active item position
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                setTimeout(() => {
                    const activeNavItem: any = document.querySelector('navbar .nav-link.active');

                    if (activeNavItem) {
                        const activeItemOffsetTop = activeNavItem.offsetTop,
                            activeItemOffsetParentTop = activeNavItem.offsetParent.offsetTop,
                            scrollDistance = activeItemOffsetTop - activeItemOffsetParentTop - (48 * 3) - 168;

                        this._fusePerfectScrollbar.scrollToTop(scrollDistance);
                    }
                });
            }
            );
    }


    ngOnInit(): void {
       

        this.user = new User();
        this.principal.identity().then(account => {

            // //console.log(JSON.stringify(account));
            this.user = account;
           

            // this.getUserDetails();


        });

        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                if (this._fuseSidebarService.getSidebar('navbar')) {
                    this._fuseSidebarService.getSidebar('navbar').close();
                }
            }
            );

        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.fuseConfig = config;
            });

        // Get current navigation
        this._fuseNavigationService.onNavigationChanged
            .pipe(
                filter(value => value !== null),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this.navigation = this._fuseNavigationService.getCurrentNavigation();
            });

            this.getUpdatedProfilePicture();


    }
    getUpdatedProfilePicture() {
        this.messageService.notificationAnnounced$.subscribe(
            res => {
                //   alert(JSON.stringify(res.message));
                if (res.topic === "newData") {
                    // alert(JSON.stringify(res.message));
                    this.imageText = res.message;
                }
            }
        )
    }


    getUserProfileDetails(){
        this.messageService.pushNotification('REQUEST_USER_PROFILE_DATA')
    }


    sendMessage(data: ICreator): void {
        // send message to subscribers via observable subject
        // this.messageService.sendMessageUserData(data);
        this.messageService.pushNotification("data", data)

    }

    // getUserDetails() {
    //     if (this.user) {
    //         this.profileService.getDetails(this.user.id).subscribe(
    //             res => {
    //                 this.userDetails = res.body;

                   

    //                 this.sendMessage(this.userDetails);

    //                 this.setProfileDetails();
    //                 //alert(JSON.stringify(this.userDetails));

    //             },
    //             err => {
    //                 alert("Cannot get details");
    //             }
    //         )
    //     }
    // }

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
     * Toggle sidebar opened status
     */
    toggleSidebarOpened(): void {
        this._fuseSidebarService.getSidebar('navbar').toggleOpen();
    }

    /**
     * Toggle sidebar folded status
     */
    toggleSidebarFolded(): void {
        this._fuseSidebarService.getSidebar('navbar').toggleFold();
    }

//     setProfileDetails() {
//         if(this.user){
//             this.email = this.user.email;
//         }
       
//         if (this.userDetails.userProfilePicture) {
          
           
//             this.imageText = this.userDetails.userProfilePicture.imageUrl;
//             // localStorage.setItem('ProfPicture', JSON.stringify(this.userDetails.userProfilePicture));
//             // localStorage.setItem('userDetails', JSON.stringify(this.userDetails));

//         }else{
//             //console.log("asx")
//         }

//         if(this.userDetails.userProfile) {
//             this.displayName = this.userDetails.userProfile.firstName + " " + this.userDetails.userProfile.lastName;

//         }
// }

}


