import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { ProfileService } from '../../profile.service';
import { MessageTestService } from 'app/services/messageTest.service';
import { ICreator, Creator } from 'app/shared/model/userProfile/creator.model';
import { Router } from '@angular/router';
import { FriendRequestService } from 'app/services/friend-request.service';
import { environment } from 'environments/environment';


@Component({
    selector     : 'profile-about',
    templateUrl  : './about.component.html',
    styleUrls    : ['./about.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileAboutComponent implements OnInit, OnDestroy
{
    friends = new Map()
    about: any;
    msgService: any;
    aboutUser: ICreator;
    

    // Private
    private _unsubscribeAll: Subject<any>;
    friendCount: number;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private _profileService: ProfileService,
        private messageTestService: MessageTestService,
        private messageService: MessageTestService,
        private friendService: FriendRequestService,
        private router:Router
    )
    {

        this.aboutUser = new Creator();
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.messageTestService.notificationAnnounced$.subscribe(
            res => {
                if (res.topic === 'GET_USER_DATA_AFTER_UPDATE_PP') {
                    // alert(JSON.stringify(res.message))
                    // alert("This is from timeline" + JSON.stringify(res.message))
                    this.aboutUser = res.message;
 
                    if(this.aboutUser){
                        this.getFriends(); 
                    }
                   

                    // alert("about user"+JSON.stringify(this.aboutUser));
                    // alert(JSON.stringify(this.aboutUser));
                    // alert("Profile Pic : " + this.commentUser.userProfilePicture.imageUrl)
                }
                
                // if(res.topic === 'loadMoreProfile') {
                // if (res.topic === 'loadMore') {
                //     this.loadMore();
                // }
            }
        )
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.getMessage();
        this._profileService.aboutOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(about => {
                this.about = about;
                
            });
        
          
           
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    getMessage() {
        this.messageService.pushNotification('REQUEST_USER_DATA_AFTER_UPDATE_PP');
        
    }
    goToSettings(){
        this.router.navigate(['/settings/general'])
      }


      getFriends(){
        //   alert(environment.uid)
        this.friendService.getAllFriendsToProfile(environment.uid).subscribe(
            res=>{
                this.friends = res.body
                this.friendCount =  Object.keys(res.body).length
               
            }
        )

      }

    
}
