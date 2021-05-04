import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { IUser, User, Principal } from 'app/core';
import * as moment from 'moment';
import { FirebaseService } from 'app/services/firebase.service';
import { ProfileService } from 'app/main/boards/profile/profile.service';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IUserProfilePicture, UserProfilePicture } from 'app/shared/model/userProfile/user-profile-picture.model';
import { DialogBoxComponent } from 'app/dialog-box/dialog-box.component';
import { MessageService } from 'app/services/message.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ICreator } from 'app/shared/model/userProfile/creator.model';
import { PreviewDialogComponent } from 'app/preview-dialog/preview-dialog.component';
import { MessageTestService } from 'app/services/messageTest.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  public _userProfilePicture: IUserProfilePicture;
  fileUploader: any;
  isSaving: boolean;
  user: IUser;
  buttonName: string;

  userDetails: ICreator;
  imageText: string;
  userName: String;
  image: IUserProfilePicture;
  

  imageChangedEvent: any = '';
  croppedImage: any = "../../assets/images/avatars/profile.jpg";
  constructor(
    private firebaseService: FirebaseService,
    private _profileService: ProfileService,
    private messageService: MessageService,
    private messageTestService: MessageTestService,
    private router: Router,
    private dialog: MatDialog,
    private principal: Principal
  ) { 

    this.messageTestService.notificationAnnounced$.subscribe(res=>{
      if(res.topic==='GET_USER_PROFILE_DATA'){
       
       if(res.message){
        // this.creator = res.message
        this.userDetails = res.message
      }
       }
 
      
    })
  }

  ngOnInit() {
    this.userProfilePicture = new UserProfilePicture();
    this.user = new User();

    this.principal.identity().then(account => {

      this.user = account;
      //   alert(JSON.stringify(account));

    });
  }

  
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    // this.userProfilePicture.profilePicture = event.base64.split(",")[1];

    //  //console.log(this.userProfilePicture.profilePicture);

  }

  imageLoaded() {
    //console.log("Imge is loaded");
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }


  save(fileUploader: any) {
    this.fileUploader = fileUploader;
    this.isSaving = true;
    this.userProfilePicture.userId = this.user.id;
    this.userProfilePicture.createDate = moment(new Date(), 'YYYY-MM-DDTHH:mm');

    this.firebaseService.uploadProfilePicsToFirebase(this.croppedImage, this.userProfilePicture.userId).then((res: string) => {
      //console.log(res);
      this.userProfilePicture.imageUrl = res;
      //console.log('profile picture is : ' + JSON.stringify(this.userProfilePicture));
      this.subscribeToSaveResponse(this._profileService.create(this.userProfilePicture));

    },
      err => {
        //console.log("Error " + err);
      }
    )

    this.buttonName = 'UPLOAD';
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IUserProfilePicture>>) {
    result.subscribe((res: HttpResponse<IUserProfilePicture>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError(res));
  }

  private onSaveSuccess() {
    localStorage.setItem('ProfPicure', JSON.stringify(this.userProfilePicture));
    this.isSaving = false;
    this.showMessage("Profile picture uploaded successfully");
    this.messageTestService.pushNotification('REQUEST_USER_DATA_AFTER_UPDATE_PP')
    this.messageService.pushNotification("newData", this.userProfilePicture.imageUrl);
    
    // this.router.navigate(['/profile']);
    // this.userProfilePicture.profilePicture = null;

    //  this.fileUploader.value = null;

  }

  private onSaveError(res) {
    this.isSaving = false;
    this.showMessage("Cannot upload profile picture");
    //console.log(JSON.stringify(res));
  }

  get userProfilePicture() {
    return this._userProfilePicture;
  }

  set userProfilePicture(userProfilePicture: IUserProfilePicture) {
    this._userProfilePicture = userProfilePicture;
  }

  showMessage(message: string) {

    const dialogRef = this.dialog.open(DialogBoxComponent, {

      width: '550px',

      data: { error1: message }

    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }

  getUserDetails(){
    if (this.user.id) {
      this._profileService.getDetails(this.user.id).subscribe(
        res => {
          this.userDetails = res.body;
          this.setPicture();

          err => {
            // alert("Cannot get details");
          }
        });
      }
  }

  setPicture() {


    if (this.userDetails.userProfilePicture) {
      this.imageText = this.userDetails.userProfilePicture.imageUrl;
      this.messageService.pushNotification("profilePicShare",this.imageText);
      localStorage.setItem("CurrentProfiePic", this.imageText);
    }

    if (this.userDetails.userProfile)
      this.userName = this.userDetails.userProfile.firstName + " " + this.userDetails.userProfile.lastName;


  }


  viewImage() {
    const dialogRef = this.dialog.open(PreviewDialogComponent, {

      width: '75vw',

      height: '70vh',

      data: { error2: this.image.profilePicture }

    });

    dialogRef.afterClosed().subscribe(result => {

    });


  }

  saving() {

    // //console.log("In principle");
    // //console.log(this.user.id)

  }

  goBack() {
    this.router.navigate(['/boards/profile'])
  }

  goAbove() {
    this.router.navigate(['/boards/profile'])
  }
  goToProfile(){
    this.router.navigate(['/boards/profile'])
  }


}
