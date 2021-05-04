import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FullscreenDialog } from 'material-ui-fullscreen-dialog';
import { ImagePostUploadService } from 'app/services/post-handle.service';
import { IImagePost, ImagePost } from 'app/shared/model/userProfile/image.post';
import { AlbumService } from 'app/services/album.service';
import { LikeService } from 'app/services/like.service';
import { Principal, User, IUser } from 'app/core';
import { IPostComment, PostComment } from 'app/shared/model/userProfile/comment.model';
import * as moment from 'moment';
import { FullCommentDetails } from 'app/shared/model/userProfile/FullCommentDetails.model';
import { fuseAnimations } from '@fuse/animations';
import { DialogBoxComponent } from 'app/dialog-box/dialog-box.component';
import FroalaEditor from 'froala-editor';
import { MessageTestService } from 'app/services/messageTest.service';
import { ICreator, Creator } from 'app/shared/model/userProfile/creator.model';
import { ProfileService } from 'app/main/boards/profile/profile.service';
export interface DialogData {
  
  pictureType: string;
  imageData: string;
  error2: string;
  ownerName: string,
  ownerImage: string
}
@Component({
  selector: 'app-preview-dialog',
  templateUrl: './preview-dialog.component.html',
  styleUrls: ['./preview-dialog.component.scss'],
  animations: fuseAnimations
})
export class PreviewDialogComponent implements OnInit {
  userFullDetails: ICreator
  CommentOperator: string;
  temporyUsers = new Map<any, any>();
  nextPageComments: number
  profilePicture: string;
  ImageCount: any;
  user: IUser;
  CommentsAmount;
  LikesAmount;
  message: string;
  numberOfPosition = 0;
  imgPost: IImagePost;
  control: boolean;
  ImagePost: IImagePost;
  ImagePreview: string;
  controlPrevious: boolean;
  postCommentDetails: IPostComment;
  mapCommentUsers = new Map();
  mapPostComments = new Map();
  postId: string;

  postOwnerName: string;
  public liked = false;
  post: any;
  FullCommentDetails: FullCommentDetails;
  amount: string;



  ngOnInit(): void {
    this.userFullDetails = new Creator()
    this.amount = 'Less'
    this.CommentOperator = 'Post'
    // this.ImagePreview = "../assets/images/defaults/default-image.png";
    this.imgPost = new ImagePost();
    this.control = false;
    this.ImagePost = new ImagePost();
    this.nextPageComments=0;
    this.typeIdentifier();
    // this.getSingleImage();
    // this.getImageOneByOne();
    this.user = new User();
    this.postCommentDetails = new PostComment();
   
    this.principal.identity().then(
      account => {
        this.user = account;
        if(this.user.id){
          this.getProfilePicture();
        }
       
      }
    )
    // if(this.numberOfPosition===0){
    //   this.controlPrevious=true;
    // }

    // if(this.numberOfPosition===this.imgPost.numberOfImages){
    //   this.control  = true;
    // }
  }

  constructor(
    private messageService: MessageTestService,
    private dialog: MatDialog,
    public albumService: AlbumService,
    public principal: Principal,
    public likeService: LikeService,
    public imagePostService: ImagePostUploadService,
    public profileService: ProfileService,
    public dialogRef: MatDialogRef<PreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.post = JSON.parse(this.data.imageData)
      this.liked = this.post.liked
      

      // this.messageService.notificationAnnounced$.subscribe(
      //   res=>{
      //     if(res.topic==='GET_USER_DATA_AFTER_UPDATE_PP'){
      //       this.userFullDetails = res.message
      //       // this.profilePicture = this.userFullDetails.userProfilePicture.imageUrl
      //     }
      //   }
      // )
    // this.getImageOneByOne();

    FroalaEditor.DefineIcon('alert', { SVG_KEY: 'help' });
    FroalaEditor.RegisterCommand('alert', {
        title: 'Hello',
        focus: false,
        undo: false,
        refreshAfterCallback: false,

        callback: function () {
            // alert('Hello!');
        }
    });
  }

  onNoClick(): void {
    this.dialogRef.close(this.CommentsAmount);
  }
  getProfilePicture() {
    this.profileService.getDetails(this.user.id).subscribe(
      res => {
          this.userFullDetails = res.body;
        
        
        
      }, err => {
          // console.log("error in loading after ppicture update again" + JSON.stringify(err))
      }
  )
  }



  getPreviousImage() {
    // if (this.numberOfPosition > 0) {
    //   this.numberOfPosition -= 1;
    // } else {
    //   this.numberOfPosition = 0;
    //   this.controlPrevious = true;
    // }

    this.numberOfPosition--;
    this.getImageOneByOne();

  }

  getNextImage() {


    this.numberOfPosition++;
    this.getImageOneByOne();

    // if (this.numberOfPosition === this.imgPost.numberOfImages) {
    //   this.controlPrevious = false;
    //   this.control = true;
    //   //console.log("this is the end")
    // } else {
    // this.numberOfPosition += 1;
    //   this.getImageOneByOne();
    // }

  }

  likeIndividual() {
    this.liked = !this.liked;
    this.likeService.like(this.ImagePost.id, this.user.id).then(
      res => {
        this.LikesAmount = res;
        //console.log('This is like ' + res);
      },
      err => {
        //console.log('This is like. But err ' + err)
      });
  }

  typeIdentifier() {
    if (this.data.pictureType === "timeline") {
    //  alert(this.data.pictureType)
      this.getImageOneByOne();
    } else if (this.data.pictureType === "pictures" || this.data.pictureType === 'photos&videos') {
      // alert(this.data.pictureType)
      this.getSingleImage();
    }
  }

  getSingleImage() {
    this.imgPost = JSON.parse(this.data.imageData);
    //console.log("This is " + this.data.ownerName);
    this.albumService.getSinglePictures(this.imgPost.id).subscribe(
      res => {
        this.ImagePost = res.body;
        this.ImagePreview = this.ImagePost.imageUrl;
        // alert(this.ImagePreview)
        // this.postOwnerName = this.data.ownerName;
        //   this.ownerName=this.map[this.ImagePost.postOwnerId].profileName
        this.LikesAmount = this.ImagePost.numberOfLikes;
        this.liked = this.ImagePost.liked;
        this.CommentsAmount = this.ImagePost.numberOfComments;
        //console.log("getting single images" + JSON.stringify(res.body));

      }, err => {
        //console.log("Error in getting single Image" + JSON.stringify(err))
      }
    )
  }

  deletePost() {

    this.imagePostService.deleteOneImageOfAPost(this.ImagePost.id, this.imgPost.type).subscribe(
      res => {
        //console.log("Successfully deleted" + JSON.stringify(res));
       //this.ImageCount--;
        this.typeIdentifier();
      },
      err => {
        //console.log("Error in deleting" + JSON.stringify(err));
        //this.ImageCount--;
        this.typeIdentifier();
      }
    )
  }
  getImageOneByOne() {

    this.imgPost = JSON.parse(this.data.imageData);
    //console.log('in the dialog box' + JSON.stringify(this.imgPost.numberOfImages));
    //console.log("This is " + this.data.ownerName);
  
    this.postId = this.imgPost.id;

    if(this.imgPost.category === "SHARED")
          this.postId = this.imgPost.originalPostId;


    this.albumService.getTimelinePostsPreview(this.postId, this.numberOfPosition, this.imgPost.type).subscribe(
      res => {
        this.ImagePost = res.body;
        this.ImagePreview = `url(${this.ImagePost.imageUrl})`;
        this.ImageCount = this.ImagePost.numberOfImages;

        // this.message = this.ImagePost.message;
        this.LikesAmount = this.ImagePost.numberOfLikes;
        this.CommentsAmount = this.ImagePost.numberOfComments;
        // //console.log("response" + JSON.stringify(res))
        // //console.log("number of position"+this.numberOfPosition);

        if ((this.numberOfPosition + 1) === this.imgPost.numberOfImages) {
          //this.controlPrevious = false;
          this.control = true;
          // //console.log("this is the end")
        } else {
          //this.control = true;
          this.control = false;
        }

        if (this.numberOfPosition === 0) {

          this.controlPrevious = true;
        } else {
          this.controlPrevious = false;
        }
      },
      err => {
        //console.log("error" + JSON.stringify(err))
      }
    )

  }

  editComment(comment){
    this.CommentOperator = 'Edit'
    this.postCommentDetails.comment = comment.comment;
    this.postCommentDetails.commentDateTime = comment.commentDateTime;
    this.postCommentDetails.commentedUserId = comment.commentedUserId;
    this.postCommentDetails.id = comment.id;
    this.postCommentDetails.postId = comment.postId;
    this.postCommentDetails.postType = comment.postType;
  }


  putComment() {
    if(this.CommentOperator==='Post'){
      this.postCommentDetails.postId = this.ImagePost.id;
      this.postCommentDetails.commentedUserId = this.user.id;
      this.postCommentDetails.postType = this.ImagePost.type;
      this.postCommentDetails.commentDateTime = moment(new Date(), 'YYYY-MM-DDTHH:mm');

      this.likeService.savePostComment(this.postCommentDetails, this.user.id).then(res => {
        //console.log('final result : ' + JSON.stringify(res));
        
        this.nextPageComments = 0;
        this.mapPostComments[this.ImagePost.id] = []
        this.postCommentDetails.comment = ''
        this.getComments("increase_comments",res);
        
       
      }, err => {
        //console.log('error in comment result : ' + JSON.stringify(err));
      });
    }


    if(this.CommentOperator==='Edit'){
      this.likeService.saveEditedComment(this.postCommentDetails).then(res=>{
        this.CommentOperator = 'Post'
        this.nextPageComments = 0;
        this.mapPostComments[this.ImagePost.id] = []
        this.ImagePost.numberOfComments = 1;
        this.getComments();
       
      })
    }
  

   


  }



  LessOrMore(Type: string){
    if(Type==='More'){
     this.amount = 'More';
     
    }else{
      this.amount = 'Less'
    }
  }

  getComments(operation?,comment?) {
   // if (this.ImagePost.numberOfComments > 0) {


      this.likeService.getAllComments(this.ImagePost.id,this.nextPageComments).then(
        (res : FullCommentDetails) => {
          if(res.commentPersons.length > 0){
          this.likeService.getUserDetailsForComments(this.ImagePost.id,res).then((ress: Map<any, any>) => {

            //    this.FullCommentDetails = res;

            // if(this.mapCommentUsers.size === 0){
                this.mapCommentUsers = ress;
                this.mapPostComments = res.comments;


            if(operation === "increase_comments"){

              this.updateNumberOfCommemtsWithPagination(comment)
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
      this.updateNumberOfCommemtsWithPagination(comment,'yes')
      this.nextPageComments=0;
      this.mapPostComments[comment.postId] = [];
      this.getComments();
     
    }
  )
}


updateNumberOfCommemtsWithPagination(commentDetails,deleted?) {
  // alert(JSON.stringify(mapComment[postId]));

  for (let comment of this.mapPostComments[this.ImagePost.id]) {

      if (comment.id === commentDetails.id) {

          if(deleted==='yes'){
              this.CommentsAmount = this.CommentsAmount - 1;
              // alert(this.CommentsAmount)
          }else{
          
             this.CommentsAmount = this.CommentsAmount + 1;
            //  alert(this.CommentsAmount)
          }
          //console.log('update comment ' + JSON.stringify(comment))
          // post.numberOfComments = this.mapComment[postId].length;
         
      }

      




  }
}
  
}
