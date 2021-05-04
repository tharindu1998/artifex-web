import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IWriting, Writing } from 'app/shared/model/userProfile/writings.model';
import { FirebaseService } from 'app/services/firebase.service';
import { resolve } from 'q';
import { CreationService } from 'app/services/creation.service';
import { DATE_TIME_FORMAT } from 'app/shared';
import * as moment from 'moment';
import { Principal, IUser, User } from 'app/core';
import { Visibility } from 'app/shared/model/userProfile/visibility.model';

@Component({
  selector: 'app-new-writing-form',
  templateUrl: './new-writing-form.component.html',
  styleUrls: ['./new-writing-form.component.scss'],
  animations: fuseAnimations
})

export class NewWritingFormComponent implements OnInit {
  public selected = Visibility.PUBLIC;
  user:IUser;
  bookCover: String;
  WritingDetails: IWriting;
  imageChangedEvent: any = '';
  files: File[] = [];
  urls: String[] = [];
  eve: EventTarget;

  existingWritingID: any;
  creating: boolean;
  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private creationService: CreationService,
    private principal: Principal,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = new User();
    this.WritingDetails = new Writing();
    this.principal.identity().then(
      account=>{
        this.user = account;

        this.activatedRouter.queryParams.subscribe(
          params=>{
             this.existingWritingID = params["novel"]

             if(this.existingWritingID){
               this.getExistingNovelDetails(this.existingWritingID)
             }
          }
        )
      }
    )
    this.bookCover = 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/sections-3.jpg)';
  }

  goBack() {
    this.router.navigate(['/creations/writings'])
  }

  getExistingNovelDetails(writingId) {
    this.creationService.getSpecificWriting(writingId).subscribe(
      res=>{
        this.WritingDetails = res.body;
        
        this.bookCover = 'url('+this.WritingDetails.imageUrl+')'
      },err=>{
        //console.log("error in getting writing details"+JSON.stringify(err))
      }
    )
  }


  onSelectFile(event) {

    //console.log("event : " + JSON.stringify(event.target.files[0]))
    this.files = [];
    this.urls = [];

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      this.eve = event.target.files;
      //console.log("event : " + JSON.stringify(event.target.files[0]))
      for (let i = 0; i < filesAmount; i++) {

        var reader: any,
          target: EventTarget;
        reader = new FileReader();
        this.files.push(event.target.files.item(i));
        //console.log("event : " + JSON.stringify(event.target.files[0]))
        reader.onload = (event) => {

          this.urls.push(event.target.result);
          this.bookCover = `url(${this.urls[0]})`
        }

        reader.readAsDataURL(event.target.files[i]);

      }
    }


  }

  // uploadBookCover(){
  // this.firebaseService.uploadAnyImageToFirebase(this.files,'bookCoverPhotos').then(
  //   (res: string[])=>{
  //     this.WritingDetails.imageUrl = res[0];

  //    // //console.log(JSON.stringify)
  //   },err=>{
  //     //console.log("error" + JSON.stringify(err));
  //   }
  // )
  // }

  uploadBookCover() {



    return new Promise((resolve, reject) => {

      this.firebaseService.uploadAnyImageToFirebase(this.files, 'bookCoverPhotos').then(
        (res: string[]) => {
          this.WritingDetails.imageUrl = res[0];
          resolve(this.WritingDetails.imageUrl)
          // //console.log(JSON.stringify)
        }, err => {
          //console.log("error" + JSON.stringify(err));
          reject(err)
        }
      );
    });

  }





  saveDetails() {
    this.creating = true;
    if(this.files.length!==0){
      this.uploadBookCover().then(
        (res: String) => {
  
          if(this.existingWritingID) {
            
          }else{
            this.WritingDetails.createDate = new Date() != null ? moment(new Date(), DATE_TIME_FORMAT) : null;
            this.WritingDetails.postOwnerId = this.user.id;
          }
  
  
          this.WritingDetails.visible = this.selected;
           
            
          //console.log("COmplete deyials" + JSON.stringify(this.WritingDetails))
          
          this.creationService.createWriting(this.WritingDetails).subscribe(
            res=>{
              this.creating = false;
              //console.log("Writing created  :  "+JSON.stringify(res.body))
              this.router.navigate(['creations/writings'])
  
            },
            err=>{
              //console.log("err writing object   :  "   +JSON.stringify(err))
              this.router.navigate(['creations/writings'])
            }
          )
        },
        err => {
          //console.log(JSON.stringify(err))
        }
      )
  
    }else{
      if(this.existingWritingID) {
            
      }else{
        this.WritingDetails.createDate = new Date() != null ? moment(new Date(), DATE_TIME_FORMAT) : null;
        this.WritingDetails.postOwnerId = this.user.id;
      }


      this.WritingDetails.visible = this.selected;
       
        
      //console.log("COmplete deyials" + JSON.stringify(this.WritingDetails))
      
      this.creationService.createWriting(this.WritingDetails).subscribe(
        res=>{
          //console.log("Writing created  :  "+JSON.stringify(res.body))
          this.router.navigate(['creations/writings'])

        },
        err=>{
          //console.log("err writing object   :  "   +JSON.stringify(err))
          this.router.navigate(['creations/writings'])
        }
      )
    }
   




    // this.firebaseService.uploadAnyImageToFirebase(this.files,'bookCoverPhotos').then(
    //   (res: string[])=>{
    //     this.WritingDetails.imageUrl = res[0];
    //     //console.log("writingDetails"+JSON.stringify(this.WritingDetails))
    //    // //console.log(JSON.stringify)
    //   },err=>{
    //     //console.log("error" + JSON.stringify(err));
    //   }
    // )


  }

}
