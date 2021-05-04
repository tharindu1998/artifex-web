import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Principal } from 'app/core';
import { ISharePost, SharePost } from 'app/shared/model/userProfile/share.model';
import { Visibility } from 'app/shared/model/userProfile/visibility.model';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared';
import { PostPublicityService } from 'app/services/post-publicity.service';
import FroalaEditor from 'froala-editor';

export interface DialogData {
  postData: any;
  userId: string;
  coverPhoto: string;
  comicTitle: string;
  writingId:string,
  openedPageId: string;
  writingDetail: any;
  shareType: string;
  likes: any;
  comments: any;
  type: string;
  comicId: string;
}



@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss']
})
export class ShareDialogComponent implements OnInit {
  sharePostDetails: ISharePost;
  public selected = Visibility.PUBLIC;
  public onProgress = false;
  coverImage : string
  shareType: string;
  constructor(
    public publicityService: PostPublicityService,
    public principal: Principal,
    public dialogRef: MatDialogRef<ShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { 
    this.coverImage = `url(${this.data.coverPhoto})`
    // alert(this.data.postData.subType)
    FroalaEditor.DefineIcon('alert', { SVG_KEY: 'help' });
    FroalaEditor.RegisterCommand('alert', {
        title: 'Hello',
        focus: false,
        undo: false,
        refreshAfterCallback: false,

        callback: function () {
            alert('Hello!');
        }
    });

  }

  ngOnInit() {
    this.sharePostDetails = new SharePost();
    // this.sharePostDetails = this.data.postData;
    this.shareType = this.data.shareType

    // alert(this.coverImage)
    
    // alert(this.data.shareType)
  }

  sharePost() {
    this.onProgress =true;
    if(this.data.shareType==='shareWriting'){
      this.sharePostDetails.postId = this.data.writingId;
      this.sharePostDetails.firstReferencePostId = this.data.openedPageId;
      this.sharePostDetails.numberOfLikes = this.data.likes;
      this.sharePostDetails.numberOfComments = this.data.comments;
      this.sharePostDetails.type = this.data.type
    }else{
      this.sharePostDetails.postId = this.data.postData.id;
      this.sharePostDetails.numberOfLikes = this.data.postData.numberOfLikes;
      this.sharePostDetails.numberOfComments = this.data.postData.numberOfComments;
      this.sharePostDetails.type = this.data.postData.type;
      
      if ( this.data.postData.category === "SHARED") {
        // alert("In the if")
        // console.log("In thw if")
        this.sharePostDetails.postId = this.data.postData.originalPostId
    }
    }
     
    this.sharePostDetails.visible = this.selected;
    // alert(JSON.stringify(this.sharePostDetails))

  //   if ( this.data.postData.category === "SHARED") {
  //     // alert("In the if")
  //     // console.log("In thw if")
  //     this.sharePostDetails.postId = this.data.postData.originalPostId
  // }




  this.sharePostDetails.createDate = new Date() != null ? moment(new Date(), DATE_TIME_FORMAT) : null;
 
  
  this.sharePostDetails.postSharePersonId = this.data.userId;
  
if(this.data.postData){
  if (this.data.postData.type === "NOVEL") {
    this.sharePostDetails.firstReferencePostId = this.data.postData.firstReferencePostId;
}

if(this.data.postData.type==="COMIC") {
 //   alert(post.referencePost)
    this.sharePostDetails.firstReferencePostId = this.data.postData.firstReferencePostId;
}
}
 

  // alert(JSON.stringify(this.sharePostDetails))
//  console.log("full post details : " + JSON.stringify(this.sharePostDetails))
  // alert(JSON.stringify(this.sharePostDetails))
      this.publicityService.sharePost(this.sharePostDetails).subscribe(
          res => {
            this.onProgress = false;
            if(res){
              this.dialogRef.close(true)
            }
          
              // console.log("Shared response : " + JSON.stringify(res.body));
          },
          err => {
            this.onProgress = false;
            // this.dialogRef.close(true)
              // console.log("Shared response : " + JSON.stringify(err.body));
          }
      )
  }

}
