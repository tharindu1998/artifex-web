import { Component, ViewEncapsulation, Inject, OnInit, OnDestroy } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabChangeEvent } from '@angular/material';
import { DialogData, DialogBoxComponent } from 'app/dialog-box/dialog-box.component';
import { IUserProfilePicture, UserProfilePicture } from 'app/shared/model/userProfile/user-profile-picture.model';
import * as moment from 'moment';
import { ProfileService } from './profile.service';
import { Observable, Subscription } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Principal, IUser, User, Account } from 'app/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MessageService } from 'app/services/message.service';
import { ICreator, Creator } from 'app/shared/model/userProfile/creator.model';
import { PreviewDialogComponent } from 'app/preview-dialog/preview-dialog.component';
import { AllDetailsService } from 'app/services/all-details.service';
import { IFullProfileDetails } from 'app/shared/model/userProfile/FullProfileDetails.model';

import { FirebaseService } from 'app/services/firebase.service';
import { MessageTestService } from 'app/services/messageTest.service';
import { FriendRequest, FriendState, IFriendRequest } from 'app/shared/model/friend/friendRequest.model';
import { DATE_TIME_FORMAT } from 'app/shared';
import { resolve } from 'dns';
import { reject } from 'q';
import { FriendRequestService } from 'app/services/friend-request.service';
import { id } from '@swimlane/ngx-charts/release/utils';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ProfileComponent {
  creator: ICreator;
  showProfile: boolean;
  friendAdditionalButton: string;
  buttonIcon1: string;
  public sent = "Send Friend Request"
  messageId: string;
  friendRequestDetails: IFriendRequest;
  routeId: string;
  currentUrl: string;
  previousUrl: string;
  routeid: any;
  index = 0;
  image: IUserProfilePicture;
  user: IUser;
  imageText: string;
  isSaving: boolean;
  messages: any[] = [];
  subscription: Subscription;

  userDetails: ICreator;
  userName: String;
  files: File;

  fullDetails: IFullProfileDetails;
  intialId: any;
  buttonIcon: string;
  profileCoverPhoto: string;



  constructor(
    public dialog: MatDialog,
    private principal: Principal,
    private profileService: ProfileService,
    private router: Router,
    private messageService: MessageService,
    private allDetailsService: AllDetailsService,
    private firebaseService: FirebaseService,
    private messageTestService: MessageTestService,
    private activatedRouter: ActivatedRoute,
    private friendResquestService: FriendRequestService

  ) {
    this.creator = new Creator();
    this.profileCoverPhoto = 'https://images.hdqwalls.com/wallpapers/bthumb/material-design-dark-red-black-ap.jpg'
    this.messageTestService.notificationAnnounced$.subscribe(res=>{
      if(res.topic==='GET_USER_PROFILE_DATA'){
       
       if(res.message){
        this.creator = res.message
        this.userDetails = res.message
      }
       }
 
      
    })
    // alert('In the profile'+this.router.url)

    this.intialId = this.activatedRouter.snapshot.paramMap.get("routeId");
    if (this.intialId === null) {
      this.activatedRouter.queryParams.subscribe(
        params => {
          // alert("ID arrived to profile " + params["id"])
          this.intialId = params["id"]

         
        }, err => {
          ////console.log("errrrr" + JSON.stringify(err))
        }
      )
    }


    // alert("IIIIDDDD: "+this.intialId)


    this.currentUrl = this.router.url;
    router.events.subscribe(
      event => {
        if (event instanceof NavigationEnd) {
          this.previousUrl = this.currentUrl;
          this.currentUrl = event.url;

          ////console.log("Previous url = " + this.previousUrl)
        }
      }
    );








  }

  onLinkClick(event: MatTabChangeEvent) {
//alert(JSON.stringify(event.tab.textLabel))

if(event.tab.textLabel==="Photos & Videos"){
  this.showProfile = false;
  this.messageTestService.pushNotification("Can_subscribe",false);
  return;
}
if(event.tab.textLabel==="Timeline"){
  this.showProfile = true;
  this.messageTestService.pushNotification("Can_subscribe",true);
}

if( event.tab.textLabel==='About'){
  this.showProfile = true;
  this.messageTestService.pushNotification("Can_subscribe",false);
  }

  }

  profileVisibility (state){
    this.showProfile = state;
    // alert(state)
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(PopUp, {
      width: '900px',

    });

    dialogRef.afterClosed().subscribe(result => {
      ////console.log('The dialog was closed');


    });
  }

  ngOnInit() {

    this.user = new User();
    this.userDetails = new Creator();
    this.friendRequestDetails = new FriendRequest();
    this.showProfile = true;

    this.principal.identity().then(account => {

      this.user = account;


      // this.setUpdatedPicture();
      // this.getMesage();

      if (this.intialId) {
        this.getUserDetails(this.intialId);
        this.buttonTypeSelector();
      } else {
        // this.setUpdatedPicture();
        // this.getMesage();
       this.getUserDetails(this.user.id);
      }

  
    });


    // this.messageTestService.notificationAnnounced$.subscribe(
    //   res => {
    //     if (res.topic === 'VIEW_OTHER_PROFILE') {
    //       this.getUserDetails(res.message);
    //     //  this.messageId = res.message.id
    //      // alert(JSON.stringify(res))
    //     }


    //   }, err => {
    //     ////console.log("Error in getting id" + JSON.stringify(err))
    //   })

  }

  // this.messageTestService.notificationAnnounced$.subscribe(res => {
  //   if (res.topic === 'GET_USER_DATA') {
  //     this.user.id = res.message.id
  //     // this.user.id = res.message.id;
  //     ////console.log("Message id "+this.user.id)
  //   }
  // })
  //}


  createAd() {
    this.router.navigate(['/create-ad'])
  }

  getMessageSDetails() {

    return new Promise((resolve, reject) => {
      // this.messageTestService.pushNotification('REQUEST_USER_DATA')

      this.messageTestService.notificationAnnounced$.subscribe(
        res => {
          if (res.topic === 'GET_USER_DATA') {
            this.messageId = res.message.id
            // alert(res)
            // // this.user.id = res.message.id;
            // ////console.log("Message id "+this.messageId)
            resolve(this.messageId)
          }
        }, err => {
          ////console.log("Error in getting id" + JSON.stringify(err))
        })




    })
  }


  getMesage() {
    // alert("In the button ")

    this.messageTestService.pushNotification('REQUEST_USER_DATA')
 
  }

  getUserDetails(profileId: string) {
if(profileId){
  this.profileService.getDetails(profileId).subscribe(
    res => {
      this.userDetails = res.body;
  //  alert(JSON.stringify(this.userDetails))
      this.setPicture();


      err => {
        // alert("Cannot get details");
      }
    });
}
    




  }

 

  setUpdatedPicture() {

    this.messageService.notificationAnnounced$.subscribe(res => {

      if (res.topic === "newData") {
        this.userDetails.userProfilePicture = res.message;


        this.setPicture();


      }
    });
  }


  



  setPicture() {


    if (this.userDetails.userProfilePicture) {
      this.imageText = this.userDetails.userProfilePicture.imageUrl;
      //this.messageService.pushNotification("profilePicShare", this.imageText);
      //localStorage.setItem("CurrentProfiePic", this.imageText);
    }

    if (this.userDetails.userProfile)
      this.userName = this.userDetails.userProfile.firstName + " " + this.userDetails.userProfile.lastName;


  }


  viewImage() {
    const dialogRef = this.dialog.open(PreviewDialogComponent, {

      width: '640px',

      height: '480px',

      data: { error2: this.image.profilePicture }

    });

    dialogRef.afterClosed().subscribe(result => {

    });


  }

  saving() {

    ////console.log("In principle");
    ////console.log(this.user.id)

  }

  selectFunction() {
    if(this.sent==='ADD FRIEND'){
      this.sendFriendDeatils();
    }else if(this.friendAdditionalButton==='CONFIRM REQUEST') {
      this.acceptFriendRequest();
    }else if(this.sent==='CANCEL REQUEST') {
      this.cancelRequest();
    }else if(this.sent==='UNFRIEND'){
      this.unfriendRequest();
    }
  }
  unfriendRequest() {
   this.friendResquestService.unfriendRequest(this.user.id,this.intialId).subscribe(
     res=>{
       ////console.log("cancelled request : "+JSON.stringify(res.body))
       this.sent = ' ADD FRIEND'
       this.buttonIcon = 'add_person'
     },err=>{
       ////console.log("err in unfriending")
     }
   )
  }

  buttonTypeSelector(){
    this.friendResquestService.getFriendState(this.user.id,this.intialId).subscribe(
      res=>{
        let friendDetails = res.body;
        ////console.log('get the state'+JSON.stringify(friendDetails))
      if(!friendDetails[0]){
        this.sent = 'ADD FRIEND'
        this.buttonIcon = 'add_person' 
      }else if(friendDetails[0].accepted==='REQUESTED'){
        if(friendDetails[0].userId===this.user.id){
          this.sent = 'CANCEL REQUEST'
          this.buttonIcon = 'delete'
        }else{
          this.sent = 'REJECT REQUEST';
          this.buttonIcon = 'delete'
          this.friendAdditionalButton = 'CONFIRM REQUEST'
          this.buttonIcon1 = 'how_to_reg'
        }

      }else if(friendDetails[0].accepted==='FRIEND'){
        this.sent = 'UNFRIEND'
        this.buttonIcon = 'delete'
        this.friendAdditionalButton = null;
      }else{
        this.sent='ADD FRIEND'
        this.buttonIcon = 'group_add'
      }

        // if(res.body.accepted==='FRIEND') {
        //   this.sent = 'UNFRIEND'
        // }else if(res.body.accepted==='UNFRIEND'){
        //   this.sent = 'ADD FRIEND'
        //   this.buttonIcon='person_add'
        // }else if(res.body.accepted==='REQUESTED'){
        //   this.sent = 'CANCEL REQUEST'
        // }else{
        //   this.sent = "Cannot send requests"
        //   this.buttonIcon = 'report_problem'
        // }
      },err=>{
        // alert("error frind STATE"+JSON.stringify(err))
      }
    )
  }
acceptFriendRequest(){
  this.friendRequestDetails.userId = this.intialId;
  this.friendRequestDetails.accepted = FriendState.FRIEND;
  this.friendRequestDetails.requestedPersonId = this.user.id;
  this.friendRequestDetails.acceptedDate = new Date()!=null? moment(new Date(),DATE_TIME_FORMAT): null;
  this.friendRequestDetails.id = null;
  this.friendRequestDetails.requestedDate = null;

  this.friendResquestService.acceptFriendRequest(this.friendRequestDetails).subscribe(
    res=>{
      ////console.log("Accepted the request"+JSON.stringify(res))
      this.friendAdditionalButton=null;
      this.sent = 'UNFRIEND';
    },err=>{
      ////console.log("CAnnot accept"+JSON.stringify(err))
    }
  )
}



  sendFriendDeatils() {
   this.friendRequestDetails.userId = this.user.id;
    this.friendRequestDetails.requestedPersonId = this.intialId;
    this.friendRequestDetails.accepted = FriendState.REQUESTED;
    this.friendRequestDetails.requestedDate = new Date() != null ? moment(new Date(), DATE_TIME_FORMAT) : null;

    // alert(this.friendRequestDetails);

    this.friendResquestService.createFriendRequest(this.friendRequestDetails).subscribe(
      res => {
        ////console.log("Friend request sent " + JSON.stringify(res))
        this.sent = "CANCEL REQUEST"
        // this.buttonIcon = ''
      }, err => {
        ////console.log("friend request not succeessed" + JSON.stringify(err))
      }
    )

  }

  cancelRequest(){
    ////console.log('calling')
    this.friendResquestService.deleteRequest(this.user.id,this.intialId).subscribe(
      res=>{
        ////console.log("cancelled the request"+JSON.stringify(res.body))
        this.sent='ADD FRIEND'
        this.buttonIcon = 'person_add'
      },err=>{
        ////console.log("Error incancelling request"+JSON.stringify(err))
      }
    )
  }








}

@Component({
  selector: 'popUp',
  templateUrl: 'popUp.html',
})
// tslint:disable-next-line:component-class-suffix
export class PopUp implements OnInit {

  public _userProfilePicture: IUserProfilePicture;
  fileUploader: any;
  isSaving: boolean;
  user: IUser;
  buttonName: string;
  public imagePath;
  imgURL: any;
  public message: string;

  files: File;

  imageChangedEvent: any = '';
  croppedImage: any = "../../../../assets/images/avatars/profile.jpg";
  constructor(
    private _profileService: ProfileService,
    private dataUtils: JhiDataUtils,
    private principal: Principal,
    private router: Router,
    private dialog: MatDialog,
    private messageService: MessageService,
    private firebaseService: FirebaseService,
    private messageTestService: MessageTestService
  ) {

  }
  ngOnInit(): void {

    this.userProfilePicture = new UserProfilePicture();
    this.user = new User();

    this.principal.identity().then(account => {

      this.user = account;
      environment.uid = account.id;
      //   alert(JSON.stringify(account));

    });

  }



  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    // this.userProfilePicture.profilePicture = event.base64.split(",")[1];

    //  ////console.log(this.userProfilePicture.profilePicture);

  }
  imageLoaded() {
    ////console.log("Imge is loaded");
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
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


  gettingProfilePicture() {
    this._profileService.getProfilePicture(this.user.id).subscribe((res: HttpResponse<IUserProfilePicture>) => {
      this.userProfilePicture = res.body;
      ////console.log("This is my pic " + JSON.stringify(this.userProfilePicture));

    })
  }


  setFileData(event, entity, field, isImage, files) {

    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };

    this.dataUtils.setFileData(event, entity, field, isImage);


  }

  // uploadToFirebase(){
  //   this.files = this.croppedImage;
  //         this.firebaseService.uploadProfilePicsToFirebase(this.files).then(
  //       (res)=>{
  //         ////console.log(res);
  //       },
  //       (err)=>{
  //         ////console.log("error"+JSON.stringify(err));
  //       }
  //     );
  // }

  save(fileUploader: any) {

    this.fileUploader = fileUploader;
    this.isSaving = true;
    this.userProfilePicture.userId = this.user.id;
    this.userProfilePicture.createDate = moment(new Date(), 'YYYY-MM-DDTHH:mm');

    this.firebaseService.uploadProfilePicsToFirebase(this.croppedImage, this.userProfilePicture.userId).then((res: string) => {
      ////console.log(res);
      this.userProfilePicture.imageUrl = res;
      ////console.log('profile picture is : ' + JSON.stringify(this.userProfilePicture));
      this.subscribeToSaveResponse(this._profileService.create(this.userProfilePicture));

    },
      err => {
        ////console.log("Error " + err);
      }
    )

    this.buttonName = 'UPLOAD'; 
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IUserProfilePicture>>) {
    result.subscribe((res: HttpResponse<IUserProfilePicture>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError(res));
  }

  private onSaveSuccess() {
    this.isSaving=false;
    this.messageTestService.pushNotification('REQUEST_USER_DATA_AFTER_UPDATE_PP')
    this.dialog.closeAll();

    // localStorage.setItem('ProfPicure', JSON.stringify(this.userProfilePicture));
    // this.isSaving = false;
    // this.showMessage("Profile picture uploaded successfully");
    // this.messageService.pushNotification("newData", this.userProfilePicture.imageUrl);
   
    // window.location.reload();
    // this.router.navigate(['/profile']);
    // this.userProfilePicture.profilePicture = null;

    //  this.fileUploader.value = null;

  }

  private onSaveError(res) {
    this.isSaving = false;
    this.showMessage("Cannot upload profile picture");
    ////console.log(JSON.stringify(res));
  }




}
