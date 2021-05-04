import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { CreationService } from 'app/services/creation.service';
import { Principal, IUser, User } from 'app/core';
import { Writing } from 'app/shared/model/userProfile/writings.model';
import { DialogBoxComponent } from 'app/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material';
import { PostPublicityService } from 'app/services/post-publicity.service';

@Component({
  selector: 'app-writings',
  templateUrl: './writings.component.html',
  styleUrls: ['./writings.component.scss'],
  animations: fuseAnimations
})
export class WritingsComponent implements OnInit {
  user: IUser;
  cover: string;
  writingDetails: Writing[] = [];
  otherProfileID: any;
  friendStatus: any;
  constructor(
    private router: Router,
    private creationService: CreationService,
    private principal: Principal,
    private dialog: MatDialog,
    private publicityService: PostPublicityService,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = new User();
    this.principal.identity().then(
      account => {
        this.user = account;
        this.activatedRouter.queryParams.subscribe(
          params=>{
            this.otherProfileID = params["profileId"];
            this.friendStatus = params["friendState"];

            if(this.otherProfileID){
              this.getAllWritings(this.otherProfileID)
            }else{
              this.getAllWritings(this.user.id)
            }
          }
        )
       
      }
    )
  }


  goBack() {
    this.router.navigate(['/creations'])
  }

  newWriting() {
    this.router.navigate(['/creations/writingForm'])
  }

  viewWriting(writingDetails: Writing) {
    // this.router.navigate(['/textEditor']);
    let navigationExtras: NavigationExtras = {
      queryParams: { "novel": writingDetails.id }
    };
    this.router.navigate(['/creations/viewContent/view'], navigationExtras);
  }
  editWriting(writingDetails: Writing) {

    // let details = JSON.stringify(writingDetails);
    // //console.log(details)
    let navigationExtras: NavigationExtras = {
      queryParams: { "novel": writingDetails.id }
    };
    this.router.navigate(['/creations/viewContent/edit'], navigationExtras);
    // this.cover = writingDetails.imageUrl;
    // this.router.navigate(['/creations/viewContent/'+this.cover.toString+'/edit/'+writingDetails.id])
  }

  getAllWritings(profileId) {
    if(this.otherProfileID){
      this.creationService.getOthersWritings(profileId,this.friendStatus).subscribe(
        res=>{
          this.writingDetails = res.body;
          //console.log("Got all friend writings : "+JSON.stringify(res))
        },err=>{
          //console.log("Error in getting the friends writings : "+JSON.stringify(err))
        }
      )

    }else{
      this.creationService.getWritings(profileId).subscribe(
        res => {
          this.writingDetails = res.body
          // //console.log(JSON.stringify(this.writingDetails))
        },
        err => {
          //console.log("error in getting the thumbnails :" + err)
        }
      )
    }
   
  }

  deleteWarning(thumbnail){
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      maxWidth: '50vw',

      data: {
          warningMessage: 'Are you sure you want to delete this post permanently?'
      }

  }

  );




  dialogRef.afterClosed().subscribe(
      res => {

          if(res){
            this.deleteWriting(thumbnail);
          }
          }
         




      
  )


  }

  deleteWriting(thumbnail){
    this.publicityService.deleteOriginalNovel(thumbnail.id).subscribe(
      res=>{
        //console.log("the novel successfully deleted"+JSON.stringify(res))
        if(this.otherProfileID){
          this.getAllWritings(this.otherProfileID)
        }else{
          this.getAllWritings(this.user.id)
        }
        
      },err=>{
        //console.log("the novel cannot be deleted")
      }
    )
  }
}
