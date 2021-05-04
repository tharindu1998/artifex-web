import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import {  MAT_DIALOG_DATA } from '@angular/material';
import { PostPublicityService } from 'app/services/post-publicity.service';
import { FullCommentDetails } from 'app/shared/model/userProfile/FullCommentDetails.model';
import { IPostComment, PostComment } from 'app/shared/model/userProfile/comment.model';
import * as moment from 'moment';
import { DialogBoxComponent } from 'app/dialog-box/dialog-box.component';
import { LikeService } from 'app/services/like.service';
import {MatDialogModule, MatDialog,MatDialogRef } from '@angular/material/dialog'

export interface DialogData {
  writingDetail: any;
  currentUser: string
  commentCount: any
}


@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit, AfterViewInit {

  creation: any;
  userId: any;
  mapCommentUsers = new Map;
  mapComment = new Map;
  numberOfComments: any;
  contro: boolean;
  text: any;
  postCommentDetails: IPostComment;
  nextPageComments: number;
  FullCommentDetails: FullCommentDetails;
  CommentOperator: string;
 

  constructor(
    private likeService: LikeService,
    private dialog: MatDialog,
    private publicityService: PostPublicityService,
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    if(this.data.writingDetail){
      this.creation = JSON.parse(this.data.writingDetail)
    }
  
    this.userId = this.data.currentUser
  }

  ngOnInit() {
    this.CommentOperator='Post';
    this.nextPageComments=0;
    this.postCommentDetails = new PostComment();
  }

  ngAfterViewInit(): void {
    // alert("this.ceation.id" + this.userId )
    this.getComments();
  }

  close(){
    this.dialogRef.close(this.data.commentCount)
  }

//   getAllCommentsWithPagination(postId,update?) {
//     if(update==='updateComments'){
//         this.updateNumberOfCommemtsWithPagination(postId)
//     }

//     if(update==='deleted'){
//       this.updateNumberOfCommemtsWithPagination(postId)
//   }
//     //console.log(postId);
//     this.publicityService.getAllComments(postId, this.nextPageComments).subscribe(
//         res => {
//             alert("Get All Comments " + JSON.stringify(res.body));


//             this.getUserDetailsForCommentsWithPagination(res.body, postId);

//         },
//         err => {
//             //console.log("Error in getting comments user details" + JSON.stringify(err));
//         }
//     )
// }

// getUserDetailsForCommentsWithPagination(commentFacts: FullCommentDetails, postId) {

//     this.publicityService.getUsersOfComments(commentFacts.commentPersons).subscribe(
//         moreUserDetails => {
//             this.mapCommentUsers = moreUserDetails.body;
//             this.FullCommentDetails = commentFacts;

//             alert(JSON.stringify(commentFacts))
//             if (!this.mapComment[postId]) {

//                 this.mapComment[postId] = commentFacts.comments[postId]
//                 //  alert(JSON.stringify(this.mapComment))
//             } else {

//                 let com: IPostComment[];
//                 com = commentFacts.comments[postId];
//                 let exists = false;
//                 this.mapComment[postId].forEach((item, index) => {
//                     com.forEach(element=>{
//                         if(element.id===item.id){
//                             exists = true
//                         }
//                     })

//                     if(!exists){
//                         com.push(item)
//                     }
                   




//                 })

//                 this.mapComment[postId] = com;
//             }
//             this.nextPageComments++;



//         },
//         err => {
//             //console.log('No Comments' + JSON.stringify(err));
//         }
//     )
// }
// updateNumberOfCommemtsWithPagination(postId) {
//     // alert(JSON.stringify(mapComment[postId]));

//     this.numberOfComments = this.mapComment[postId].length;

   
// }



//   // updateNumberOfCommemts(mapComment: Map<any, any>, postId) {
//   //   // alert(JSON.stringify(mapComment[postId]));
  
//   //   this.contro = true;
//   // }


//   deleteComment(comment) {
//     this.publicityService.deleteComment(comment.id).subscribe(
//         res=>{
//             //console.log("comment deleted")
           
//         },err=>{
//             //console.log("error in deleting comments"+JSON.stringify(err))
//         }
//     )
// }


  editComment(comment){
    this.CommentOperator = 'Edit'
    // alert(JSON.stringify(comment))
    this.text = comment.comment;
    this.postCommentDetails.commentDateTime = comment.commentDateTime;
    this.postCommentDetails.commentedUserId = comment.commentedUserId;
    this.postCommentDetails.id = comment.id;
    this.postCommentDetails.postId = comment.postId;
    this.postCommentDetails.postType = comment.postType;

  
}

  savePostComment() {

    
    if(this.CommentOperator==='Edit'){
      this.postCommentDetails.comment = this.text
      this.publicityService.generateEditCommit(this.postCommentDetails).subscribe(
          res=>{
             this.text = '';
             this.nextPageComments=0;
             this.mapComment[this.creation.id] = [];

             this.getComments();
          }
      )
  }

  if(this.CommentOperator==='Post'){

    this.postCommentDetails.postId = this.creation.id;
    this.postCommentDetails.commentedUserId = this.userId;
    this.postCommentDetails.postType = this.creation.type;
    this.postCommentDetails.commentDateTime = moment(new Date(), 'YYYY-MM-DDTHH:mm');
    this.postCommentDetails.comment = this.text;



    this.publicityService.generateComment(this.postCommentDetails).subscribe(
      res => {
        if (res.body) {
         // this.postCommentDetails.comment = '';
        this.text = '';
        this.nextPageComments = 0;
        this.mapComment[this.creation.id] = []
        this.getComments('increase_comments');

        }
        
      },
      err => {
        //console.log(JSON.stringify(err));
      }
    )
  }

   


    //console.log("comemnt details : " + JSON.stringify(this.postCommentDetails));
   
  }


  







  getComments(operation?,comment?) {
    // if (this.ImagePost.numberOfComments > 0) {
 
 if(this.creation){
  this.likeService.getAllComments(this.creation.id,this.nextPageComments).then(
    (res : FullCommentDetails) => {

     if(res.commentPersons.length > 0){

      this.likeService.getUserDetailsForComments(this.creation.id,res).then((ress: Map<any, any>) => {

            this.mapCommentUsers = ress;
            this.mapComment = res.comments;


        if(operation === "increase_comments"){
          this.updateNumberOfCommemtsWithPagination('no')
        }


      this.nextPageComments++;


      });

     }



    },
    err => {
      //console.log(JSON.stringify(err))
    }
  );
// }

 }
      
   }
 
 
 
 
   warningMessagePopup(comment,type){
     let msg = 'Are you sure you want to delete this '+type+'permanently?'
     const dialogRef = this.dialog.open(DialogBoxComponent,
       {
         width: '600px',
         maxHeight: '100vh',
         data: {
           warningMessage: msg
       }
       }
       
       )
 
       
       dialogRef.afterClosed().subscribe(
         res => {
 
           
 
             if(type==='comment'){
                 if(res){
                     this.deleteComment(comment);
                 }
             }
 
         }
     )
 
   }
 
 deleteComment(comment){
   this.likeService.deleteComment(comment).then(
     res=>{
       this.updateNumberOfCommemtsWithPagination('yes')
       this.nextPageComments=0;
       this.mapComment[comment.postId] = [];
       this.getComments();
      
     }
   )
 }
 
 
 updateNumberOfCommemtsWithPagination(deleted) {
   // alert(JSON.stringify(mapComment[postId]));

   if(deleted==='yes'){
     this.data.commentCount--
   }else if (deleted==='no'){
     this.data.commentCount++
   }
 
  //  for (let comment of this.mapComment[this.creation.id]) {
 
  //      if (comment.id === commentDetails.id) {
 
  //          if(deleted==='yes'){
  //              this.data.commentCount--;
               
  //          }else{
           
  //          this.data.commentCount++;
         
  //          }
  //          //console.log('update comment ' + JSON.stringify(comment))
  //          // post.numberOfComments = this.mapComment[postId].length;
          
  //      }
 
       
 
 
 
 
   }
 



}









