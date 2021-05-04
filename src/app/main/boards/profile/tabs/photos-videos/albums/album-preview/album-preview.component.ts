import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { IUser, User, Principal } from 'app/core';
import { ProfileService } from 'app/main/boards/profile/profile.service';
import { IUserProfilePicture } from 'app/shared/model/userProfile/user-profile-picture.model';
import { DialogBoxComponent } from 'app/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material';
import { PreviewDialogComponent } from 'app/preview-dialog/preview-dialog.component';
import { AlbumService } from 'app/services/album.service';
import { ICreator, Creator } from 'app/shared/model/userProfile/creator.model';
import { MessageTestService } from 'app/services/messageTest.service';

@Component({
  selector: 'app-album-preview',
  templateUrl: './album-preview.component.html',
  styleUrls: ['./album-preview.component.scss'],
  animations: fuseAnimations
})
export class AlbumPreviewComponent implements OnInit {

  profileDetails: ICreator
  keyword: string;
  PictureType: string;
  user: IUser;
  CategorizedImageSetDetails: IUserProfilePicture[];
  albumsId: any;
  othersID: any;
  otherPictureType: any;
  creatorMe: ICreator;
  constructor(
    private activatedRoute: ActivatedRoute,
    private principal: Principal,
    private profService: ProfileService,
    private dialog: MatDialog,
    private router: Router,
    private albumService: AlbumService,
    private messageService: MessageTestService
  ) {

    this.activatedRoute.queryParams.subscribe(
      params => {
        this.albumsId = params["albumId"];

        this.PictureType = params["pictureType"];
        this.otherPictureType = params["albumName"]

        this.othersID = params["othersID"]
      }
    )

    if (this.otherPictureType) {
      this.PictureType = this.otherPictureType
    }

    this.messageService.notificationAnnounced$.subscribe(
      res => {
        if (res.topic === 'GET_USER_PROFILE_DATA') {
          this.creatorMe = res.message;
          // alert("mesage service" + JSON.stringify(this.creatorMe))
        }

      }
    )







  }

  ngOnInit() {
    this.user = new User();
    this.profileDetails = new Creator();
    this.creatorMe = new Creator();
    this.principal.identity().then(
      account => {
        this.user = account;
        if (this.othersID) {
          this.getOtherProfileDetials()
        } else {
          this.getUserProfileData();
        }


        if (this.PictureType === 'Profile Pictures') {
          if (this.othersID) {

            this.getCategorizedPhotos(this.othersID);
          } else {

            this.getCategorizedPhotos(this.user.id)
          }
        } else if (this.albumsId) {
          this.getAlbumPhotos();
        }



      }





    );
    // this.keyword= this.activatedRoute.snapshot.paramMap.get('keyword');
    // if(this.keyword=="profilePicture"){
    //  this.PictureType= "Profile Pictures";
    // }
  }


  getCategorizedPhotos(user) {

    this.profService.getCategorizedPictures(user).subscribe(
      res => {
        this.CategorizedImageSetDetails = res.body;
        //console.log("Categorized by date : " + JSON.stringify(this.CategorizedImageSetDetails));
      },
      err => {
        // alert("error in getting categor pics" + err);
      }
    );
  }

  getUserProfileData() {
    this.messageService.pushNotification('REQUEST_USER_PROFILE_DATA')
  }


  getAlbumPhotos() {
    this.albumService.getAlbumPhotosAll(this.albumsId).subscribe(
      res => {
        this.CategorizedImageSetDetails = res.body;
        //console.log(JSON.stringify(this.CategorizedImageSetDetails))
      }, err => {
        //console.log("Error in getting the album photos : " + JSON.stringify(err))
      }
    )
  }

  delete(id: string) {
    this.profService.delete(id).subscribe(
      res => {
        if (this.othersID) {
          this.getCategorizedPhotos(this.othersID);
        } else {
          this.getCategorizedPhotos(this.user.id)
        }

        this.showMessage("Image deleted successfully");

      },
      err => {
        this.showMessage("Deletion failed");
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
  setAsProfilePic(userProfilePicture: IUserProfilePicture) {
    this.profService.update(userProfilePicture).subscribe(
      res => {
        this.showMessage("Profile picture is updated successfully");
      },
      err => {
        this.showMessage("Unable to update the profile picture");
      }
    )
  }

  goBack() {
    this.router.navigate(['/boards/profile']);
  }

  viewImage(imageDetails) {
    let holder;
    let image;
  
    //console.log(JSON.stringify(imageDetails))

    if(this.othersID){
     holder = this.profileDetails.userProfile.displayName
     image = this.profileDetails.userProfilePicture.imageUrl
    }else{
      holder = this.creatorMe.userProfile.displayName
      if(this.creatorMe.userProfilePicture.imageUrl){
        image = this.creatorMe.userProfilePicture.imageUrl
      }

    }

// alert(JSON.stringify(imageDetails))


    const dialogRef = this.dialog.open(PreviewDialogComponent, {

        width: '70vw',

        height: '100vh',



        data: { imageData:JSON.stringify(imageDetails), pictureType: 'photos&videos', ownerName: holder,ownerImage: image }


    });

    dialogRef.afterClosed().subscribe(result => {

    });


  }



  getOtherProfileDetials() {

    // alert("other Profile details"+JSON.stringify(this.profileDetails));
    this.profService.getDetails(this.othersID).subscribe(res=>{
      this.profileDetails = res.body;


    },err=>{
      //console.log("errorin getting other profile : "+JSON.stringify(err))
    })
  }

}
