import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectorRef, ViewContainerRef, Input } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { Subject } from "rxjs";

import { takeUntil } from "rxjs/operators";
import { Principal, IUser, User } from "app/core";
import { ProfileService } from "../../../profile.service";
import { MatDialog } from "@angular/material";
import { DialogBoxComponent } from "app/dialog-box/dialog-box.component";
import { PreviewDialogComponent } from "app/preview-dialog/preview-dialog.component";
import { IUserProfilePicture } from "app/shared/model/userProfile/user-profile-picture.model";
import { ImagePostUploadService } from "app/services/post-handle.service";
import { ImagePost, IImagePost } from "app/shared/model/userProfile/image.post";
import { MessageTestService } from "app/services/messageTest.service";
import { ICreator, Creator } from "app/shared/model/userProfile/creator.model";
import { ActivatedRoute } from "@angular/router";
import { FriendRequestService } from "app/services/friend-request.service";
import { FriendRequest } from "app/shared/model/friend/friendRequest.model";

@Component({
    selector: 'pictures',
    templateUrl: './pictures.component.html',
    styleUrls: ['./pictures.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class PicturesComponent implements OnInit, OnDestroy {
    public CategorizedImageSetDetails: IUserProfilePicture[];
    ImagePostList: any[];
    user: IUser;
    creator: ICreator;
    urls: ImagePost[];
    inputTexts: string;
    @Input() _profileService

    photosVideos: any;


    map = new Map([[2, 'foo'], [1, 'bar']]);

    // Private
    private _unsubscribeAll: Subject<any>;
    othersID: any;
    friendState: FriendRequest;
    NextPageMyAllPictures: number;
    nextPageOthersAllPictures: number;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private changeDetectorRefs: ChangeDetectorRef,
        private viewContainerRef: ViewContainerRef,
        private principal: Principal,
        private profService: ProfileService,
        private dialog: MatDialog,
        private imagePostService: ImagePostUploadService,
        private messageService: MessageTestService,
        private activatedRouter: ActivatedRoute,
        private friendService: FriendRequestService
        //private profileService: ProfileService
    ) {


        this.othersID = this.activatedRouter.snapshot.paramMap.get("routeId");
        if (this.othersID === null) {
            this.activatedRouter.queryParams.subscribe(
                params => {
                    // alert("ID arrived to profile " + params["id"])
                    this.othersID = params["id"]
                    //console.log("from pictures :" + this.othersID)



                }, err => {
                    //console.log("errrrr" + JSON.stringify(err))
                }
            )
        }


        // Set the private defaults
        this._unsubscribeAll = new Subject();
     
        this.creator = new Creator();



        this.messageService.notificationAnnounced$.subscribe(
            res => {
                if (res.topic === 'GET_USER_PROFILE_DATA') {
                    this.creator = res.message;
                    // alert(JSON.stringify(this.creator))
                }

            }
        )





    }


    ngOnInit(): void {

        // this.CategorizedImageSetDetails = new Map();

        this.user = new User();
        this.nextPageOthersAllPictures = 0;
        this.NextPageMyAllPictures = 0;
        this.principal.identity().then(
            account => {
                this.user = account;

                if (this.othersID) {
                    this.getFriendStatus();

                }

                this.getUserData();
                // this.getCategorizedPhotos();
                if (!this.othersID) {
                    this.getAllPictures();
                }

            }





        );










        // this._profileService.photosVideosOnChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(photosVideos => {
        //         this.photosVideos = photosVideos;
        //     });



    }


    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    tabLoadTimes: Date[] = [];

    getTimeLoaded(index: number) {
        if (!this.tabLoadTimes[index]) {
            this.tabLoadTimes[index] = new Date();
        }

        return this.tabLoadTimes[index];
    }


    getFriendStatus() {
        this.friendService.getFriendState(this.user.id, this.othersID).subscribe(
            res => {
                
                // alert(res.body[0].accepted)
                if (this.othersID) {
                    this.getAllOthersPictures(res.body[0].accepted);
                }
                //console.log("friend state from pictures :" + JSON.stringify(res.body))
            }, err => {
                //console.log("error in getting frind state from pictures : " + JSON.stringify(err))
            }
        )
    }




    getAllPictures() {
        this.imagePostService.getAllPictures(this.user.id,'image',this.NextPageMyAllPictures).subscribe(
            res => {
                if(this.NextPageMyAllPictures===0){
                    this.ImagePostList = res.body;
                   
                }else{


                    res.body.forEach(element=>{
                        this.ImagePostList.push(element)
                    })
                }

                this.NextPageMyAllPictures++;
              
                //    alert(JSON.stringify(this.ImagePostList))
            },
            err => {
                //console.log("error in gtting pics" + JSON.stringify(err));
            }
        )
    }


    getAllOthersPictures(friendState) {
        this.imagePostService.getOthersPictures(this.othersID, friendState,this.nextPageOthersAllPictures).subscribe(
            res => {
                if(this.nextPageOthersAllPictures===0){
                    this.ImagePostList = res.body
                }else{
                    res.body.forEach(element => {
                        this.ImagePostList.push(element)
                    });
                }

                this.nextPageOthersAllPictures++;

              
                //console.log("Successfully received all pictures : " + JSON.stringify(res.body))
            }, err => {
                //console.log("Error in getting others pictures :" + JSON.stringify(err))
            }
        )
    }


    showMessage(message: string) {

        const dialogRef = this.dialog.open(DialogBoxComponent, {

            width: '550px',

            data: { error1: message }

        });

        dialogRef.afterClosed().subscribe(result => {

        });

    }


    viewImage(image: string) {
        const dialogRef = this.dialog.open(PreviewDialogComponent, {

            width: '70vw',

            height: '90vh',

            data: { error2: image }

        });

        dialogRef.afterClosed().subscribe(result => {

        });


    }

    showImage(path: string) {
        // //console.log(path);
        const dialogRef = this.dialog.open(PreviewDialogComponent, {

            width: '70vw',
            maxWidth: '100vw',
            maxHeight: '100vh',
            height: '100vh',
            data: { imageData: JSON.stringify(path), pictureType: "pictures", ownerName: this.creator.userProfile.displayName, ownerImage: this.creator.userProfilePicture.imageUrl }

        });

        dialogRef.afterClosed().subscribe(result => {

        });

    }


    getUserData() {
        this.messageService.pushNotification('REQUEST_USER_PROFILE_DATA')
    }


}
