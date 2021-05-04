import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProfileService } from '../profile.service';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { IFullCommentDetails, FullCommentDetails } from 'app/shared/model/userProfile/FullCommentDetails.model';
import { IPostComment, PostComment } from 'app/shared/model/userProfile/comment.model';
import { ILikes, Likes } from 'app/shared/model/userProfile/likes.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IImagePost, Visibility, ImagePost } from 'app/shared/model/userProfile/image.post';
import { IAlbumPost, AlbumPost } from 'app/shared/model/userProfile/album.model';
import { IUser, Principal, User } from 'app/core';
import { IPostDetails, PostDetails } from 'app/shared/model/userProfile/PostDetails.model';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { ImagePostUploadService } from 'app/services/post-handle.service';
import { AlbumService } from 'app/services/album.service';
import { MatDialog } from '@angular/material';
import { FirebaseService } from 'app/services/firebase.service';
import { PostPublicityService } from 'app/services/post-publicity.service';
import { MessageService } from 'app/services/message.service';
import { LikeService } from 'app/services/like.service';
import { PreviewDialogComponent } from 'app/preview-dialog/preview-dialog.component';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared';
import { ISharePost, SharePost } from 'app/shared/model/userProfile/share.model';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { MessageTestService } from 'app/services/messageTest.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FriendRequestService } from 'app/services/friend-request.service';
import FroalaEditor from 'froala-editor';
import { ShareDialogComponent } from 'app/share-dialog/share-dialog.component';
import { DialogBoxComponent } from 'app/dialog-box/dialog-box.component';
import { Creator, ICreator } from 'app/shared/model/userProfile/creator.model';
import { post } from 'selenium-webdriver/http';
import { ArticleWriterComponent } from 'app/article-writer/article-writer.component';
import { IReport, Report } from 'app/shared/model/report/report.model';
import { CommonDialogComponent } from 'app/common-dialog/common-dialog.component';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FeedComponent implements OnInit, OnDestroy, AfterViewInit {



    // Private


    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    reportPostDetails: IReport
    public landscapeAmount = '2'
    public portraitAmount = '1'
    temporyUsers = new Map<any, any>();
    cont: boolean;
    sharePostDetails: ISharePost;
    uploadedFileType: string;
    selected: string;
    FullCommentDetails: IFullCommentDetails;
    userComment: string;
    postCommentDetails: IPostComment;
    likedPostDetails: ILikes;
    map = new Map();
    mapComment = new Map();
    mapCommentUsers = new Map();
    mapPostComments = new Map();
    mapCreations = new Map();
    postUpload: FormGroup;
    timeline: any;
    imagePost: IImagePost;
    imagePosts = [];
    photoCollection: IAlbumPost;
    photoType: string;
    user: IUser;
    visibility: Visibility.ONLY_FRIENDS;
    // postDetails: any[];
    //  p: any[];
    // postDetails: any[];
    postDetails: IPostDetails;
    task: AngularFireUploadTask;
    ref: any;
    downloadURL: any;
    eve: EventTarget;
    matController: boolean;

    public imagePath;
    clearButton: boolean;
    urls = [];
    files: File[] = [];
    videoFiles: File[] = [];
    videoUrls: string[] = [];
    imageUrls: string[] = [];
    theIDS = ['5ca31707eb820c07c8f82765'];
    images = [{ "image": "https://www.google.com.ua/url?sa=i&source=images&cd=&ved=2ahUKEwj838fAr5riAhXNMewKHagECioQjRx6BAgBEAU&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3D%252Furl%253Fsa%253Di%2526source%253Dimages%2526cd%253D%2526ved%253D%2526url%253Dhttps%25253A%25252F%25252Fwww.nytimes.com%25252F2018%25252F12%25252F21%25252Farts%25252Fdesign%25252Fcomic-books-holidays.html%2526psig%253DAOvVaw3KkKJizpktk6NkadKCudI0%2526ust%253D1557900916502859%26psig%3DAOvVaw3KkKJizpktk6NkadKCudI0%26ust%3D1557900916502859&psig=AOvVaw3KkKJizpktk6NkadKCudI0&ust=1557900916502859" }]

    // Private
    private _unsubscribeAll: Subject<any>;
    photoPost: boolean;
    noOfImages: number;
    username: string;
    postType: string;
    likes: any;
    profilePicture: string;
    imgPost: any;
    public imgAd: SafeStyle;
    intialId: string;
    showShareButton: boolean;
    selectedEmoji: any;
    commentUser: ICreator;
    nextPostPagesNumber: number;
    msgService: any;
    nextPageComments: number;
    CommentOperator: string;
    nextPageNumber: number;
    friendState: any;
    selectedPost: any;
    showContent: string;
    ads: any;
    land1: string;
    land2: string;
    constructor(
        private _profileService: ProfileService,
        private formBuilder: FormBuilder,
        private imagePostService: ImagePostUploadService,
        private principal: Principal,
        private albumService: AlbumService,
        private store: AngularFireStorage,
        private dialog: MatDialog,
        private firebaseService: FirebaseService,
        private publicityService: PostPublicityService,
        private messageService: MessageTestService,

        private likeService: LikeService,
        private sanitizer: DomSanitizer,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private friendHandleService: FriendRequestService


    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.CommentOperator = 'Post'
        this.showContent = 'less'
        this.photoType = 'image';
        this.photoPost = true;
        this.noOfImages = 2;
        this.username = "Dinalie Liyanage";
        this.postType = 'own';
        this.uploadedFileType = 'image';
        this.commentUser = new Creator();
        this.reportPostDetails = new Report();
        this.ads = 'url(assets/images/ads/dummy.jpg)'
        this.land1 = 'url(assets/images/ads/dummy.jpg)'
        this.land2 = 'url(assets/images/ads/dummy.jpg)'


        this.intialId = this.activatedRoute.snapshot.paramMap.get("routeId");
        if (this.intialId === null) {
            this.activatedRoute.queryParams.subscribe(
                params => {
                    this.intialId = params["id"]

                    // alert("ID arrived to timeline" + params["id"])
                }, err => {
                    //console.log("errrrr" + JSON.stringify(err))
                }
            )
        }

        //this.postDetails=[true,true];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // alert("in the timeline")

        this.nextPostPagesNumber = 0;
        this.nextPageComments = 0;
        this.getProfilePic();
        this.user = new User();
        this.sharePostDetails = new SharePost();
        this.photoCollection = new AlbumPost();
        this.postDetails = new PostDetails();
        this.likedPostDetails = new Likes();
        this.postCommentDetails = new PostComment();
        this.FullCommentDetails = new FullCommentDetails();
        this.postDetails.listPostDetails = [];
        this.postDetails.creationsDetails = [];
        this.postDetails.postOwnerIds = [];
        this.imagePost = new ImagePost;
        this.principal.identity().then(account => {
            this.user = account;
            this.getMessage();
            // this.getAllNewPosts();
            environment.uid = account.id;
            this.getAllFriends(environment.uid)
            // this.getAllNewPostsArtden();
            // alert(this.router.url)

            //   if(this.intialId) {
            //       this.getFriendStateChecked();
            //       // this.viewOtherProfile(this.intialId,'FRIENDS')

            //   }else{
            //       this.getAllNewPosts();
            //   }

            setInterval(() => {
                // this.imgAd = this.sanitizer.bypassSecurityTrustStyle('./assets/wallpaper/cards/png/' + Number(this.getRandomArbitrary(1, 27)).toFixed(0) + '.png');
                // this.imgAd = 'assets/wallpaper/cards/Ads/' + Number(this.getRandomArbitrary(1, 7)).toFixed(0) + '.jpg'
                if(this.router.url==='/boards/artden'){
                    this.getAllAdevrtisements().then((res: any)=>{
                        // alert("got data"+JSON.stringify(res.portraitAdds[0].adGraphic))
                        if(res.portraitAdds[0]){
                            this.ads = `url(${res.portraitAdds[0].adGraphic})`
                        }

                        if(res.landscapeAdds[0]){
                            this.land1 = `url(${res.landscapeAdds[0].adGraphic})`
                        }
                          
                        if(res.landscapeAdds[1]){
                           
                            this.land2 = `url(${res.landscapeAdds[1].adGraphic})`
                        }
                          

                           
                        
                        
                    }
                        
                    )
                }
             

            }, 8000);



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
        })




        // this.messageTestService.notificationAnnounced$.subscribe(
        //     res => {
        //       if (res.topic === 'VIEW_OTHER_PROFILE') {
        //         this.viewOtherProfile(res.message,"FRIENDS");
        //       }


        //     }, err => {
        //       //console.log("Error in getting id" + JSON.stringify(err))
        //     })

        this._profileService.timelineOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(timeline => {
                this.timeline = timeline;
            });


        this.postUpload = this.formBuilder.group({
            content: ['', [Validators.required]]
        });

        this.postUpload.valueChanges.subscribe(
            res => {
                //console.log(JSON.stringify(res));
            }
        )

        this.subscribeToMsg();
        this.messageService.notificationAnnounced$.subscribe(res => {
            if (res.topic === 'feed') {
                res.message.addEventListener('ps-y-reach-end', () => {
                    // alert("scroll from artden")
                    if (this.router.url === '/boards/artden') {
                        this.loadMore()
                    }
                })
            }
        })
    }


    ngAfterViewInit() {


    }

    viewArticle(content) {
        const dialogRef = this.dialog.open(ArticleWriterComponent,{
            width:'70vw',
            height: '90vw',
            data:{article: content}
        })
    }

    subscribeToMsg() {
        this.msgService = this.messageService.notificationAnnounced$.subscribe(
            res => {
                if (res.topic === 'GET_USER_PROFILE_DATA') {
                    // alert("This is from timeline" + JSON.stringify(res.message))
                    this.commentUser = res.message;
                }

                // if (res.topic === 'loadMoreArtden') {
                //     alert("Artden")
                //     // this.loadMore();
                // }

                // if (res.topic === 'loadMore') {
                //     alert("Artden")
                //     this.loadMore();
                // }
            }
        )
    }


    loadMoreOrLessMessage(post){
        this.selectedPost = post.id;
        if(this.showContent === 'less'){
            this.showContent = 'more'
        }else{
            this.showContent = 'less'
        }

        // alert(this.showContent)
    }

    getMessage() {
        this.messageService.pushNotification('REQUEST_USER_PROFILE_DATA');
    }

    getAllFriends(myID) {
        this.friendHandleService.getAllFriendsArtden(myID).subscribe(
            res => {
                console.log("friends all : " + JSON.stringify(res.body))
                this.getAllNewPostsArtden(res.body)
            },
            err => {
                //console.log("Error " + JSON.stringify(err))
            }
        )
    }


    loadMore() {
        this.getAllFriends(this.user.id)
        // alert("load more artden")
    }



    select($event, source) {
        if (source === 'post_upload') {
            this.imagePost.message = this.imagePost.message + $event.emoji.native;
        } else {
            this.postCommentDetails.comment = this.postCommentDetails.comment + $event.emoji.native
        }


        //console.log($event);
        this.selectedEmoji = $event.emoji;
        // this.pasteHtmlAtCaret("<span>hi</span>");
        //console.log(JSON.stringify(this.selectedEmoji))
    }




    public filess;

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        this.msgService.unsubscribe();
    }




    onSelectFile(event) {
        //console.log("event : " + JSON.stringify(event.target.files[0]))
        this.files = [];
        this.clearButton = true;
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
                    this.uploadedFileType = 'image';
                }

                reader.readAsDataURL(event.target.files[i]);

            }
        }


    }



    onSelectVideoFile(event) {
        //console.log("in the function video file")
        this.files = [];
        this.clearButton = true;
        //console.log("test : " + JSON.stringify(event.target.files))
        if (event.target.files && event.target.files[0]) {
            var filesAmount = event.target.files.length;
            this.eve = event.target.files;
            //console.log("in the if")
            for (let i = 0; i < filesAmount; i++) {

                var reader: any,
                    target: EventTarget;
                reader = new FileReader();
                this.videoFiles.push(event.target.files.item(i));
                //console.log("video files" + JSON.stringify(this.videoFiles))
                reader.onload = (event) => {
                    //console.log(event.target.result)
                    this.urls.push(event.target.result);

                    this.uploadedFileType = 'video';
                    // //console.log(this.uploadedFileType)
                }

                reader.readAsDataURL(event.target.files[i]);

            }
        }
    }

    show() {

        //console.log(JSON.stringify(this.urls));
        // alert(this.imageUrls);
    }

    getFriendStateChecked(userId, friendId) {
       return new Promise((resolve,reject)=>{
            this.friendHandleService.getFriendState(userId, friendId).subscribe(
                res => {
                    if (res.body.length != 0) {
                        alert('checking state' + JSON.stringify(res.body[0].accepted))
                        this.friendState = res.body[0].accepted
                        resolve(this.friendState)
                    } 
    
    
                    // this.viewOtherProfile(this.intialId,res.body[0].accepted)    //correct line... this should be uncommented
                },
                err => {
                    //console.log(JSON.stringify(err))
                    reject(err)
                }
            )
        })
       
    }



    // deleteWarningMessage() {

    // }

    showImage(path: any) {
        if(path.visible==='PUBLIC'){
            this.callPreviewDialog(path);
        }else if(path.visible==='ONLY_FRIENDS'){
            if(path.postOwnerId!==this.user.id){
                this.getFriendStateChecked(this.user.id,path.postOwnerId).then(
                    res=>{
                        if(res==='FRIEND'){
                            this.callPreviewDialog(path)
                        }
                    }
                )
                
            }else{
                this.callPreviewDialog(path)
            }
        }else{
            if(path.postOwnerId===this.user.id){
                this.callPreviewDialog(path);
            }
        }
       

        // //console.log(path);
        // this.imgPost = JSON.parse(path);
        
        //console.log("image path detailsssssssssssss" + JSON.stringify(path));
       
    }

    callPreviewDialog(post){
        const dialogRef = this.dialog.open(PreviewDialogComponent, {
            width: '70vw',
            minWidth: '60vw',
            maxWidth: '100vw',
            maxHeight: '100vh',
            minHeight: '95vh',
            

            data: { imageData: JSON.stringify(post), pictureType: "timeline", ownerName: this.map[post.postOwnerId].profileName, ownerImage: this.map[post.postOwnerId].profilePicture }

        });

        dialogRef.afterClosed().subscribe(result => {
            result=>{
                // path.numberOfComments = result
            }
        });

    }


    getProfilePic() {
        this.messageService.notificationAnnounced$.subscribe(
            res => {
                if (res.topic === "profilePicShare") {
                    this.profilePicture = res.message;
                    //console.log("getting Profile pic to the timeline" + this.profilePicture)
                }
            }
        )
    }

    clearImages() {

        this.urls = [];

        this.imagePost.message = null;

        //console.log(this.imageUrls);

    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    showShareDialog(post, comicName, comicCover) {
        const dialogRef = this.dialog.open(ShareDialogComponent,
            {
                width: '70vw',
                height: '97vh',
                data: { postData: post, userId: this.user.id, comicTitle: comicName, coverPhoto: comicCover }
            })



        dialogRef.afterClosed().subscribe(result => {
            this.router.navigateByUrl('/boards/artden/' + this.user.id, { skipLocationChange: true }).then(() =>
            this.router.navigate(['/boards/artden/',this.user.id]));
        });

    }

    showNormalPostShare(post, previewSample) {
        //console.log("post is" + JSON.stringify(post))
        const dialogRef = this.dialog.open(ShareDialogComponent,
            {
                width: '70vw',
                height: '95vh',
                data: { postData: post, userId: this.user.id, coverPhoto: previewSample }
            })



        dialogRef.afterClosed().subscribe(result => {
            this.router.navigateByUrl('/boards/artden/' + this.user.id, { skipLocationChange: true }).then(() =>
            this.router.navigate(['/boards/artden/',this.user.id]));
        });

    }

    sharePost(post) {
        //  alert("In function")
        this.sharePostDetails.postId = post.id;
        // //console.log("post  : " + JSON.stringify(post))

        if (post.category === "SHARED") {
            // alert("In the if")
            //console.log("In thw if")
            this.sharePostDetails.postId = post.originalPostId
        }

        if (post.catagory === "SHARED") {
            // alert("In the if")
            //console.log("In thw if")
            this.sharePostDetails.postId = post.originalPostId
        }


        //alert("ref: "+post.firstReferencePostId+"and post id"+post.id)

        this.sharePostDetails.createDate = new Date() != null ? moment(new Date(), DATE_TIME_FORMAT) : null;
        this.sharePostDetails.numberOfLikes = post.numberOfLikes;
        this.sharePostDetails.numberOfComments = post.numberOfComments;
        this.sharePostDetails.sharedMassege = post.message;
        this.sharePostDetails.type = post.type;
        this.sharePostDetails.postSharePersonId = this.user.id;

        if (post.type === "NOVEL") {
            this.sharePostDetails.firstReferencePostId = post.firstReferencePostId;
        }

        if (post.type === "COMIC") {
            //   alert(post.referencePost)
            this.sharePostDetails.firstReferencePostId = post.firstReferencePostId;
        }


        //console.log("full post details : " + JSON.stringify(this.sharePostDetails))

        this.publicityService.sharePost(this.sharePostDetails).subscribe(
            res => {
                //console.log("Shared response : " + JSON.stringify(res.body));
                // this.getAllNewPosts();
            },
            err => {
                //console.log("Shared response : " + JSON.stringify(err.body));
            }
        )
    }

    like(postId,post?) {
        this.likedPostDetails.postId = postId;
        this.likedPostDetails.likedUserId = this.user.id;
        this.likedPostDetails.postType = post.type
        this.likedPostDetails.likeDateTime = new Date()!==null? moment(new Date(),DATE_TIME_FORMAT):null;
        //console.log(JSON.stringify(this.likedPostDetails))

        let service = this.publicityService.generateLike(this.likedPostDetails).subscribe(
            res => {
                //console.log("Like successful" + JSON.stringify(res.body));
                this.updateLikes(res.body, postId);
                // service.unsubscribe()
            },
            err => {
                //console.log(JSON.stringify(err))
            }
        );


    }
    permissonMessage(post, type?) {
        const dialogRef = this.dialog.open(DialogBoxComponent, {
            maxWidth: '50vw',

            data: {
                warningMessage: 'Are you sure you want to delete this post permanently?'
            }

        }

        );




        dialogRef.afterClosed().subscribe(
            res => {

                if(post.type==='COMIC'){
                    this.deleteNovel(post)
                }else if (post.type === 'NOVEL') {
                    if (res) {
                        this.deleteNovel(post);
                    }
                } else {
                    if (post.category === 'SHARED') {
                        if (res)
                            this.deletePostShared(post);
                    } else {
                        if (res) {
                            this.deletePost(post);
                        }
                    }
                }


                if (type === 'comment') {
                    if (res) {
                        this.deleteComment(post);
                    }
                }


            });







    }

    deleteNovel(post) {
        this.publicityService.deleteNovelPost(post.id).subscribe(
            res => {
                //console.log("deleted novel post" + JSON.stringify(res.body))
                this.getAllNewPosts();
            },
            err => {
                //console.log("cannot delete the novel post" + JSON.stringify(err))
                this.getAllNewPosts();
            }
        )
    }




    deletePostShared(post) {
        this.publicityService.deleteSharedPost(post.id).subscribe(
            res => {
                //console.log("Shared post deleted" + JSON.stringify(res.body))
            },
            err => {
                //console.log("cannot delete the shared post" + JSON.stringify(err))
            }
        )
    }

    deletePost(Post) {
        //console.log(Post);
        if (Post.type === 'IMAGE_POST' || Post.type === 'ALBUM') {
            this.imagePostService.deleteSingleImage(Post.id, Post.type).subscribe(
                res => {
                    //console.log("Post is successfully deleted" + JSON.stringify(res.body));

                    setTimeout(() => {
                        // alert('hereeeee');
                        this.getAllNewPosts();

                    }, 3000);
                },
                err => {
                    //console.log("Error in deleting the post: " + JSON.stringify(err));


                    setTimeout(() => {
                        this.getAllNewPosts();

                    }, 5000);
                }
            )
        }

    }


    deleteComment(comment) {
        this.publicityService.deleteComment(comment.id).subscribe(
            res => {
                ////console.log("comment deleted")

                // this.mapComment.forEach((key,value)=>{
                //     alert("key exists")
                //     if(key === comment.postId){

                //         let exists = false;
                //         value.forEach((value,index)=>{

                //             if(value.id === comment.id){
                //               //  this.mapComment[comment.postId]
                //               alert("deleted")
                //                 exists = true;

                //             }

                //         })


                //     }


                // });
                this.nextPageNumber = 0;
                this.mapComment[comment.postId] = [];


                // this.update(comment.postId,'deleted')
                this.getUserDetailsForCommentsWithPagination(null, null, comment)
            }, err => {
                //console.log("error in deleting comments" + JSON.stringify(err))
            }
        )
    }




    editComment(comment) {
        this.CommentOperator = 'Edit'
        // alert(JSON.stringify(comment))
        this.postCommentDetails.comment = comment.comment;
        this.postCommentDetails.commentDateTime = comment.commentDateTime;
        this.postCommentDetails.commentedUserId = comment.commentedUserId;
        this.postCommentDetails.id = comment.id;
        this.postCommentDetails.postId = comment.postId;
        this.postCommentDetails.postType = comment.postType;


    }


    savePostComment(post: ImagePost) {



        if (this.CommentOperator === 'Edit') {
            this.publicityService.generateEditCommit(this.postCommentDetails).subscribe(
                res => {
                    this.postCommentDetails.comment = '';
                    this.nextPageNumber = 0;
                    this.mapComment[post.id] = [];
                    this.CommentOperator = 'Post'
                    this.getAllCommentsWithPagination(post.id)
                }
            )
        }

        if (this.CommentOperator === 'Post') {
            this.postCommentDetails.postId = post.id;
            this.postCommentDetails.commentedUserId = this.user.id;
            this.postCommentDetails.postType = post.type;
            this.postCommentDetails.commentDateTime = moment(new Date(), 'YYYY-MM-DDTHH:mm');

            this.publicityService.generateComment(this.postCommentDetails).subscribe(
                res => {
                    if (res.body) {
                        this.postCommentDetails.comment = '';
                    }

                    this.nextPageNumber = 0;
                    this.mapComment[post.id] = []

                    this.getAllCommentsWithPagination(post.id, 'updateComments');
                },
                err => {
                    //console.log(JSON.stringify(err));
                }
            )
        }


        // alert("comemnt details : " + JSON.stringify(this.postCommentDetails));




    }


    updateLikes(totalNUmberOfLikes, postId: string) {

        for (let post of this.postDetails.listPostDetails) {

            // if (post.type==='IMAGE_POST') {
            if (post.id === this.likedPostDetails.postId) {
                post.numberOfLikes = totalNUmberOfLikes;

                if (post.liked) {
                    post.liked = false;
                } else {
                    post.liked = true;
                }

                break;

            }
            // }

        }

    }







    imageCounter() {
        if (this.urls.length == 1) {
            this.postImages();
            //console.log("single image")
        } else if (this.urls.length > 1) {
            this.postImages();
            //console.log("multi images")
        } else {
            this.postImages();
        }
    }


    postImages() {

        this.imagePost.postOwnerId = this.user.id;
        this.imagePost.category = 'UPLOAD'
        // this.imagePost.imageUrls = this.imageUrls;

        this.imagePost.createDate = new Date() != null ? moment(new Date(), DATE_TIME_FORMAT) : null;

        //  //console.log(JSON.stringify(this.imagePost));

        //   //console.log(this.imagePost);

        if (!this.imagePost.visible) {
            this.imagePost.visible = Visibility.ONLY_FRIENDS;
        }

        //alert( this.imagePost.visible)

        //   //console.log(this.imagePost);

        this.imagePostService.create(this.imagePost).subscribe(
            res => {
                //console.log("iMAGE UPLAOD SUCCESS" + JSON.stringify(res.body));

                this.urls = [];
                this.files = [];
                this.imageUrls = [];
                this.imagePost.imageUrls = [];
                this.imagePost.message = null;

                // window.location.reload();
                // alert("res delivered");

                setTimeout(() => {
                    this.getAllNewPosts();
                    this.matController = false;
                }, 5000);


            },
            err => {
                //console.log("error uploading images: " + JSON.stringify(err));


                this.matController = false;
                this.files = [];
                this.urls = [];
                this.imageUrls = [];
                this.imagePost.imageUrls = [];
                this.imagePost.message = null;
                this.getAllNewPosts();

            }
        )


    }

    // multipleImagesUpload() {
    //     this.photoCollection.postOwnerId = this.user.id;
    //     this.photoCollection.imageUrls = this.urls;
    //     this.photoCollection.createDate = new Date() != null ? moment(new Date(), DATE_TIME_FORMAT) : null;
    //     ////console.log(JSON.stringify(this.photoCollection));
    //     this.albumService.createAlbum(this.photoCollection).subscribe(
    //         res => {
    //             //console.log(JSON.stringify(res.body));
    //             this.urls = null;
    //         },
    //         err => {
    //             //console.log(JSON.stringify(err));
    //         }
    //     );
    //     }
    // for(let imageUrl of this.urls) {

    //   let  newImagePost = new ImagePost();
    //   newImagePost.postOwnerId = this.user.id;
    //   newImagePost.imageUrl = imageUrl;
    //   newImagePost.createDate = new Date() != null ? moment(new Date(), DATE_TIME_FORMAT) : null;
    //   //console.log(newImagePost);
    //   this.imagePosts.push(newImagePost);
    // }






    getAllPosts() {



        this.imagePostService.getPosts(this.user.id).subscribe(
            res => {
                //console.log(JSON.stringify(res.body));
                // this.postDetails = res.body;
                //  this.p = this.postDetails.listPostDetails;

            },
            err => {
                //console.log(JSON.stringify(err));
            }
        )
    }

    viewPublishedPage(id: String, pageId: string,post) {
        let novelId;
        novelId = post.id
        if(post.catagory==='SHARED'){
            novelId = post.originalPostId
        }else{
          
        }

        let navigationExtras: NavigationExtras = {
            queryParams: { "novel": novelId, "page": pageId }
        };
        this.router.navigate(['/creations/viewContent/view'], navigationExtras);
    }

    viewPublishedComicPage(post,comicId: string, pageId: string) {
        let viewComicId;
        viewComicId = comicId
        if(post.catagory==='SHARED'){
            viewComicId = post.originalPostId
        }
        let navigationExtras: NavigationExtras = {
            queryParams: { "comicID": viewComicId, "page": pageId, "actionType": 'view' }
        };

        this.router.navigate(['/creations/comic-editor'], navigationExtras)

    }


    // viewPublishedPage(id: String, pageId: string, post) {
    //     let navigationExtras: NavigationExtras = {
    //         queryParams: { "novel": id, "page": pageId, "post": post }
    //     };
    //     this.router.navigate(['/creations/viewContent/view'], navigationExtras);
    // }

    // viewPublishedComicPage(comicId: string, pageId: string) {
    //     let navigationExtras: NavigationExtras = {
    //         queryParams: { "comicID": comicId, "page": pageId, "actionType": 'view' }
    //     };

    //     this.router.navigate(['/creations/comic-editor'], navigationExtras)

    // }






    getPostUserDetails(ids) {
        this.imagePostService.getPostUsersDetails(ids).subscribe(res => {
            // //console.log(res);
            //   this.map = res.body;
            //let map = new Map<string,Object>();
            //  //console.log("user detailssssss :    " + JSON.stringify(res.body))
            this.map = res.body;
            this.cont = true;
            //  this.keys = Object.keys(res.body);
            //   //console.log(this.map["5ca31707eb820c07c8f82765"]);
            //   //console.log(map);
        },
            err => {
                //console.log("error in getting post user details " + JSON.stringify(err));
            })
    }


    getAllNewPostsArtden(friendsIds) {

        this.imagePostService.getNewPostsNMethodArtden(this.user.id, friendsIds, this.nextPostPagesNumber).subscribe(
            // this.imagePostService.getNewPostsNMethodArtden(this.user.id).subscribe(
            res => {

              //  //console.log("getting all details" + JSON.stringify(res.body));
                if (this.nextPostPagesNumber === 0) {
                    this.messageService.pushNotification('scroll-topic', 'feed');
                }


                if(res.body){
                    this.nextPostPagesNumber++;
                }
                // this.postDetails = res.body;
                // if (this.postDetails.postOwnerIds.length != 0) {
                //     this.getPostUserDetails(this.postDetails.postOwnerIds);
                // }

                res.body.listPostDetails.forEach((item, index) => {
                    // if (!this.postDetails.listPostDetails.includes(item))

                    let exists = false;
                    this.postDetails.listPostDetails.forEach((item1, index) => {
                        if (item.id === item1.id) {
                            exists = true;
                        }
                    })
                    if (!exists) {
                        this.postDetails.listPostDetails.push(item)

                    }

                })

                res.body.creationsDetails.forEach((item, index) => {



                    if (!this.postDetails.creationsDetails.includes(item))
                        this.postDetails.creationsDetails.push(item)


                })

                res.body.postOwnerIds.forEach((item, index) => {

                    if (!this.postDetails.postOwnerIds.includes(item))
                        this.postDetails.postOwnerIds.push(item)


                })



                if (this.postDetails.creationsDetails.length != 0) {
                    this.getAllCreationDetails(this.postDetails.creationsDetails)
                } else {
                    if (this.postDetails.postOwnerIds.length != 0) {
                        this.getPostUserDetails(this.postDetails.postOwnerIds);
                    }
                }

             //   this.nextPostPagesNumber++;
                //  //console.log("post details  :   " + JSON.stringify(this.postDetails));

                //this.postDetails.push(res.body);
            },
            err => {
                //console.log("Error in getting list post details" + err)

            }
        )
    }

    getAllNewPosts() {
        this.imagePostService.getNewPostsNMethod(this.user.id).subscribe(
            res => {
                //console.log("getting all details" + JSON.stringify(res.body));
                this.postDetails = res.body;
                // if (this.postDetails.postOwnerIds.length != 0) {
                //     this.getPostUserDetails(this.postDetails.postOwnerIds);
                // }


                if (this.postDetails.creationsDetails.length != 0) {
                    this.getAllCreationDetails(this.postDetails.creationsDetails)
                } else {
                    if (this.postDetails.postOwnerIds.length != 0) {
                        this.getPostUserDetails(this.postDetails.postOwnerIds);
                    }
                }


                //  //console.log("post details  :   " + JSON.stringify(this.postDetails));

                //this.postDetails.push(res.body);
            },
            err => {
                //console.log("Error in getting list post details" + err)

            }
        )
        // this.imagePostService.getNewPosts(this.user.id).subscribe(
        //     res => {
        //         //   //console.log(res.body);
        //         this.postDetails = res.body;
        //         //console.log("post details  :   "+JSON.stringify(this.postDetails));
        //         if (this.postDetails.postOwnerIds.length != 0) {
        //             this.getPostUserDetails(this.postDetails.postOwnerIds);
        //         }

        //     },
        //     err => {
        //         //console.log("error in get sll newposts" + JSON.stringify(err));
        //     }
        // )
    }



    viewOtherProfile(id, friendState) {
        // alert('friendstate' + friendState)
        this.imagePostService.viewOtherProfile(id, friendState, this.user.id).subscribe(
            res => {
                //console.log("getting all details" + JSON.stringify(res.body));
                this.postDetails = res.body;
                // if (this.postDetails.postOwnerIds.length != 0) {
                //     this.getPostUserDetails(this.postDetails.postOwnerIds);
                // }


                if (this.postDetails.creationsDetails.length != 0) {
                    this.getAllCreationDetails(this.postDetails.creationsDetails)
                } else {
                    if (this.postDetails.postOwnerIds.length != 0) {
                        this.getPostUserDetails(this.postDetails.postOwnerIds);
                    }
                }


                //  //console.log("post details  :   " + JSON.stringify(this.postDetails));

                //this.postDetails.push(res.body);
            },
            err => {
                //console.log("Error in getting list post details" + err)

            })

    }

    getAllCreationDetails(creationsPageList) {
        this.imagePostService.getAllCreationThumbsOfLog(creationsPageList).subscribe(
            res => {
                this.mapCreations = res.body;
                // //console.log("getting creation details successfull "+JSON.stringify(this.mapCreations['5d2adc993c2f5d3438c7124c'].post));
                if (this.postDetails.postOwnerIds.length != 0) {
                    this.getPostUserDetails(this.postDetails.postOwnerIds);
                }
            }, err => {
                //console.log("error in getting all creation details")
            }
        )
    }


    getAllCommentsWithPagination(postId, update?) {
        if (update === 'updateComments') {
            this.updateNumberOfCommemtsWithPagination(postId)
        }
        //console.log(postId);
        this.publicityService.getAllComments(postId, this.nextPageComments).subscribe(
            res => {
                // alert("Get All Comments " + JSON.stringify(res.body));


                this.getUserDetailsForCommentsWithPagination(res.body, postId);

            },
            err => {
                //console.log("Error in getting comments user details" + JSON.stringify(err));
            }
        )
    }

    getUserDetailsForCommentsWithPagination(commentFacts: FullCommentDetails, postId, deletingComment?) {

        this.publicityService.getUsersOfComments(commentFacts.commentPersons).subscribe(
            moreUserDetails => {

                this.FullCommentDetails = commentFacts;

                if (this.mapCommentUsers.size === 0) {
                    this.mapCommentUsers = moreUserDetails.body;
                } else {
                    this.temporyUsers = moreUserDetails.body;
                    ////console.log("more usersssssssssssssss "+ JSON.stringify(Object.keys(this.temporyUsers)));

                    Object.keys(this.temporyUsers).forEach(newkey => {

                        this.mapCommentUsers[newkey] = this.temporyUsers[newkey];

                    })


                }




                if (!this.mapComment[postId]) {

                    this.mapComment[postId] = commentFacts.comments[postId]
                    //  alert(JSON.stringify(this.mapComment))
                } else {

                    let com: IPostComment[];
                    com = commentFacts.comments[postId];
                    let exists = false;
                    this.mapComment[postId].forEach((item, index) => {
                        com.forEach(element => {
                            if (element.id === item.id) {
                                exists = true
                            }
                        })

                        if (!exists) {
                            com.push(item)
                        }

                    })

                    this.mapComment[postId] = com;
                }
                this.nextPageNumber++;


            },
            err => {
                //console.log('No Comments' + JSON.stringify(err));
            }
        )




    }
    updateNumberOfCommemtsWithPagination(postId,deleted?) {
        // alert(JSON.stringify(mapComment[postId]));

        for (let post of this.postDetails.listPostDetails) {

            if (post.id === postId) {

                if(deleted==='yes'){
                    post.numberOfComments = post.numberOfComments - 1;
                }else{
                    post.numberOfComments = post.numberOfComments + 1;
                }
                //console.log('update comment ' + JSON.stringify(post))
                // post.numberOfComments = this.mapComment[postId].length;
               
            }






        }
    }

    upImages(files: FileList) {

        for (let i = 0; i < files.length; i++) {
            this.files.push(files.item(i));
        }


    }

    uploadFiles(type: string) {
        if (type == 'image') {
            //console.log("type : " + type)
            //console.log("uplaoding image files")

            this.uploadImage();
        } else if (type = 'video') {
            //console.log("type : " + type)
            //console.log("upoading video files")
            this.uploadVideo();
        }
    }

    uploadVideo() {
        this.matController = true;

        this.firebaseService.uploadVideoToFirebase(this.urls[0], this.user.id).then(
            (res: string[]) => {
                //console.log("upload successfull" + JSON.stringify(res));
                this.matController = false;
            }, err => {
                //console.log(JSON.stringify(err))
                this.matController = false;
            }

        )
    }
    uploadImage() {
        this.matController = true;

        this.firebaseService.uploadImagesToFirebase(this.files).then(
            (res: string[]) => {
                //console.log(res);
                this.imagePost.imageUrls = res;
                // this.matController = false;
                this.urls = [];
                this.files = [];
                this.imageUrls = [];
                this.postImages();
            },
            (err) => {
                //console.log("error" + JSON.stringify(err));
                // this.matController = false;
                this.files = [];
                this.urls = [];
                this.imageUrls = [];
            }
        )

   

    }


    getAllAdevrtisements(){
     return new Promise((resolve,reject)=>{
         this.publicityService.getAdvertisements(this.landscapeAmount,this.portraitAmount).subscribe(
             res=>{
                 resolve(res.body)
             },err=>{
                 reject(err)
             }
         )
     })
    }


    reportPostDialog(post){
        const dialogRef = this.dialog.open(CommonDialogComponent,
            {
                width: '600px',
                minHeight: '200px',
                data:{
                    term:'report'
                }
            }
            
            
            )

        dialogRef.afterClosed().subscribe(
            res=>{
                if(res){
                    this.reportPost(post)
                }
            },err=>{

            }
        )
    }


    reportPost(post){
        if(post.category==='UPLOAD'){
            this.reportPostDetails.postOwnerId = post.postOwnerId
        }

        if(post.category==='SHARED'){
            this.reportPostDetails.postOwnerId = post.sharedPersonId
        }
            this.reportPostDetails.postId = post.id;
            this.reportPostDetails.reportDateTime = new Date()!==null?moment(new Date(),DATE_TIME_FORMAT):null;
            this.reportPostDetails.reportPersonId = this.user.id;
            this.reportPostDetails.type = post.type

            // if(post.type==='NOvel')
          
            this.imagePostService.createReportPost(this.reportPostDetails).subscribe(
                res=>{
                    console.log(JSON.stringify(res.body))
                },err=>{
                    console.log(JSON.stringify(err))
                }
            )
        
    }


}



