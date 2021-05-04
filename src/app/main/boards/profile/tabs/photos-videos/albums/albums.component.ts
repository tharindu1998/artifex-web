import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectorRef, ViewContainerRef, Input } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { Subject } from "rxjs";
import { ProfileService } from "app/main/boards/artden/profile.service";
import { takeUntil } from "rxjs/operators";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { MessageService } from "app/services/message.service";
import { ICreator } from "app/shared/model/userProfile/creator.model";
import { AlbumService } from "app/services/album.service";
import { Principal, IUser, User } from "app/core";
import { FriendRequestService } from "app/services/friend-request.service";
import { MessageTestService } from "app/services/messageTest.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})



export class AlbumsComponent implements OnInit, OnDestroy {
  userDetails: ICreator;
  imageText: string;
  userName: string;
  user: IUser;
  albumThumbnails: any[] = [];
  othersID: any;
  nextAlbumThumbsPage: number;
  friendState: any;
  constructor(
    private router: Router,
    private messageService: MessageTestService,
    private albumService: AlbumService,
    private principal: Principal,
    private activatedRoute: ActivatedRoute,
    private friendService: FriendRequestService
  ) {

    this.messageService.notificationAnnounced$.subscribe(
      res=>{
        if(res.topic==='GET_USER_PROFILE_DATA'){
          this.userDetails = res.message;
          this.imageText = this.userDetails.userProfilePicture.imageUrl
        }
      }
    )


    this.othersID = this.activatedRoute.snapshot.paramMap.get("routeId");

    if (this.othersID === null) {
      this.activatedRoute.queryParams.subscribe(
        params => {
          // alert("ID arrived to profile " + params["id"])
          this.othersID = params["id"]
          //console.log("from album :" + this.othersID)



        }, err => {
          //console.log("errrrr" + JSON.stringify(err))
        }
      )
    }



  }
  ngOnInit(): void {
    this.messageService.pushNotification('REQUEST_USER_PROFILE_DATA')
    this.nextAlbumThumbsPage = 0
    this.user = new User();
    this.setPicture();
    this.principal.identity().then(
      account => {
        this.user = account;
        if (!this.othersID) {
          this.getAlbumThumbnails();
        } else {
          this.getFriendStatus();
        }

      }
    )
  }
  getFriendStatus() {
    this.friendService.getFriendState(this.user.id, this.othersID).subscribe(
      res => {

        // alert(res.body[0].accepted)
        if (this.othersID) {
          this.friendState = res.body[0].accepted
          this.getOtherALbumThumbs(res.body[0].accepted);
        }
        //console.log("friend state from pictures :" + JSON.stringify(res.body))
      }, err => {
        //console.log("error in getting frind state from pictures : " + JSON.stringify(err))
      }
    )
  }
  getOtherALbumThumbs(accepted: any) {
    this.albumService.getOthersAlbumThumbnails(this.othersID, accepted, this.nextAlbumThumbsPage).subscribe(
      res => {
        if (this.nextAlbumThumbsPage == 0) {
          this.albumThumbnails = res.body
        } else {
          res.body.forEach(element => {

            this.albumThumbnails.push(element)

          });
        }



        //console.log(JSON.stringify(this.albumThumbnails))
        this.nextAlbumThumbsPage++;
      }, err => {
        //console.log("error in getting album thumbs of others : " + JSON.stringify(err))
      }
    )
  }

  ngOnDestroy(): void {

  }

  albumView(pictureType, media,mediaName?) {
   // alert(JSON.stringify(JSON.stringify(media.albumName.value)))
    if (pictureType === 'Profile Pictures') {
      let navigationExtras: NavigationExtras = {
        queryParams: {"albumId": null,  "albumName": null,"pictureType": pictureType, "othersID": this.othersID }
      };

      this.router.navigate(['/boards/profile/albumPreview'], navigationExtras);
    }else if(pictureType === 'other') {
      let navigationExtras: NavigationExtras = {
        queryParams: {"albumId": media.id, "albumName": mediaName, "othersID": this.othersID }
      };
      this.router.navigate(['/boards/profile/albumPreview'], navigationExtras);
    }


   
    ///(type);
    // this.router.navigate(['/profile/albumPreview', { queryParams: { keyword: type } }]);
    //    let navigationExtras: NavigationExtras = {
    //     queryParams: { "albumId": media.id, "albumName": media.albumName, "pictureType":pictureType, "othersID": this.othersID }
    // };
    // this.router.navigate(['/boards/profile/albumPreview'], navigationExtras);

  }


  setThumbnailProfilePicture() {

    //   this.messageService.notificationAnnounced$.subscribe(res=>{
    // //console.log(JSON.stringify(res.message));
    //     if(res.topic==="newData"){
    //     this.userDetails.userProfilePicture = res.message;


    //       this.setPicture();


    //     }
    //   });


  }

  getAlbumThumbnails() {
    this.albumService.getAlbumThumbnails(this.user.id).subscribe(
      res => {
        this.albumThumbnails = res.body;

        //console.log(JSON.stringify(res.body));
      },
      err => {
        //console.log(JSON.stringify(err));
      }
    )
  }



  setPicture() {
    this.imageText = localStorage.getItem("CurrentProfiePic");

    // if(this.userDetails.userProfilePicture){
    //   this.imageText = 'data:image/png;base64,' + this.userDetails.userProfilePicture.profilePicture;
    // }



  }

  ablumPicList = [
    {
      type: "profilepicture",
      src: "../../../../../../../assets/images/cards/card1.jpg"
    },
    {
      type: "timelinepictures",
      src: "../../../../../../../assets/images/cards/card2.jpg"
    },

  ]


}
