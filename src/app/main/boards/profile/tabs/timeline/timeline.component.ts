import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import FroalaEditor from 'froala-editor';
import { ProfileService } from '../../profile.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ImagePostUploadService } from 'app/services/post-handle.service';
import { IImagePost, ImagePost, Visibility } from 'app/shared/model/userProfile/image.post';
import { Principal, User, IUser } from 'app/core';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AlbumService } from 'app/services/album.service';
import { IAlbumPost, AlbumPost } from 'app/shared/model/userProfile/album.model';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { resolve } from 'url';
import { reject } from 'q';
import { NgStyle } from '@angular/common';
import { MatDialog } from '@angular/material';
import { DialogBoxComponent } from 'app/dialog-box/dialog-box.component';
import { FirebaseService } from 'app/services/firebase.service';
import { PreviewDialogComponent } from 'app/preview-dialog/preview-dialog.component';
import { IPostDetails, PostDetails } from 'app/shared/model/userProfile/PostDetails.model';
import { HttpResponse } from '@angular/common/http';
import { ILikes, Likes } from 'app/shared/model/userProfile/likes.model';
import { PostPublicityService } from 'app/services/post-publicity.service';
import { MessageService } from 'app/services/message.service';
import { IPostComment, PostComment } from 'app/shared/model/userProfile/comment.model';
import { FullCommentDetails, IFullCommentDetails } from 'app/shared/model/userProfile/FullCommentDetails.model';
import { LikeService } from 'app/services/like.service';
import { ISharePost, SharePost } from 'app/shared/model/userProfile/share.model';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MessageTestService } from 'app/services/messageTest.service';
import { ShareDialogComponent } from 'app/share-dialog/share-dialog.component';
import { post } from 'selenium-webdriver/http';
import { FriendRequestService } from 'app/services/friend-request.service';
import { ICreator, Creator } from 'app/shared/model/userProfile/creator.model';
import { UserProfile } from 'app/shared/model/userProfile/user-profile.model';
import { UserProfilePicture } from 'app/shared/model/userProfile/user-profile-picture.model';

//import { IPostDetails, PostDetails } from 'app/shared/model/userProfile/PostDetails.model';



@Component({
    selector: 'profile-timeline',
    templateUrl: './timeline.component.html',


    styleUrls: ['./timeline.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})


export class ProfileTimelineComponent implements OnInit, OnDestroy {
    public content: string;
    imgOptions: false;
    public landscapeAmount = '2'
    public portraitAmount = '1'
    nextPostPagesNumber: number;
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
    commentUser = new Creator();
    friendState: any;
    nextPageNumber: number
    tempComments: [];
    throttle = 300;
    scrollDistance = 0;
    scrollUpDistance = 2;
    msgService: any;
    allow: any;
    nextPageOtherProfilePosts: number;
    CommentOperator: string;
    temporyUsers = new Map<any, any>();
    ads: string;
    land1: string;
    land2: string;
    type: string;
    creating: boolean;
   


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
        private messageTestService: MessageTestService,
        private likeService: LikeService,
        private sanitizer: DomSanitizer,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private friendHandleService: FriendRequestService


    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        //  this.commentUser = new Creator();
        this.commentUser.userProfile = new UserProfile();
        this.commentUser.userProfilePicture = new UserProfilePicture()
        
        this.photoType = 'image';
        this.photoPost = true;
        this.noOfImages = 2;
        this.username = "Dinalie Liyanage";
        this.postType = 'own';
        this.uploadedFileType = 'image';
        this.ads = 'url(assets/images/ads/dummy.jpg)'
        this.land1 = 'url(assets/images/ads/dummy.jpg)'
        this.land2 = 'url(assets/images/ads/dummy.jpg)'

        this.msgService = this.messageTestService.notificationAnnounced$.subscribe(
            res => {
                if (res.topic === 'GET_USER_PROFILE_DATA') {
                    // alert("This is from timeline" + JSON.stringify(res.message))
                    this.commentUser = res.message;
                    // alert("Profile Pic : " + this.commentUser.userProfilePicture.imageUrl)
                }

                // if(res.topic === 'loadMoreProfile') {
                // if (res.topic === 'loadMore') {
                //     this.loadMore();
                // }
            }
        )

        this.intialId = this.activatedRoute.snapshot.paramMap.get("routeId");
        // alert('id initial' + this.intialId)
        if (this.intialId === null) {
            this.activatedRoute.queryParams.subscribe(
                params => {
                    this.intialId = params["id"]

                    // alert("ID arrived to timeline" + this.intialId)
                }, err => {
                    //console.log("errrrr" + JSON.stringify(err))
                }
            )
        }


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

        //this.postDetails=[true,true];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.CommentOperator = 'Post'
        this.allow = true;
        // alert("in the timeline")
        this.nextPageOtherProfilePosts = 0;
        this.nextPostPagesNumber = 0;
        this.nextPageNumber = 0;

        this.user = new User();
        this.sharePostDetails = new SharePost();
        this.photoCollection = new AlbumPost();
        this.postDetails = new PostDetails();
        this.likedPostDetails = new Likes();
        this.postCommentDetails = new PostComment();
        this.FullCommentDetails = new FullCommentDetails();
        this.imagePost = new ImagePost;
        this.imagePost.imageUrls = []
        this.postDetails.listPostDetails = [];
        this.postDetails.creationsDetails = [];
        this.postDetails.postOwnerIds = [];

       
        
        this.principal.identity().then(account => {
            this.user = account;
            // this.getAllNewPosts();
            this.getMessage();
            // alert(this.router.url)

            if (this.intialId) {
                if (this.intialId !== this.user.id) {
                    this.getFriendStateChecked();
                } else {
                    this.router.navigate(['boards/profile'])
                }



                // this.viewOtherProfile(this.intialId,'FRIENDS')

            } else {
                this.getAllNewPosts();
            }

            this.getProfilePic();

            setInterval(() => {
                // this.imgAd = this.sanitizer.bypassSecurityTrustStyle('./assets/wallpaper/cards/png/' + Number(this.getRandomArbitrary(1, 27)).toFixed(0) + '.png');
                // this.imgAd = 'assets/wallpaper/cards/Ads/' + Number(this.getRandomArbitrary(1, 7)).toFixed(0) + '.jpg'
                if (this.router.url === '/boards/profile') {
                    this.getAllAdevrtisements().then((res: any) => {
                        // alert("got data"+JSON.stringify(res.portraitAdds[0].adGraphic))
                        if (res.portraitAdds[0]) {
                            this.ads = `url(${res.portraitAdds[0].adGraphic})`
                        }

                        if (res.landscapeAdds[0]) {
                            this.land1 = `url(${res.landscapeAdds[0].adGraphic})`
                        }

                        if (res.landscapeAdds[1]) {
                            this.land2 = `url(${res.landscapeAdds[1].adGraphic})`
                        }


                    }

                    )
                }


            }, 5000);




        })

        // this.messageService.notificationAnnounced$.subscribe(
        //     res => {
        //         if (res.topic === 'GET_USER_DATA') {
        //             alert("This is from timeline" + res.message)
        //         }
        //     }
        // )


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


        this.messageService.notificationAnnounced$.subscribe(res => {
            if (res.topic === 'Can_subscribe') {

                this.allow = res.message


            }
            if (res.topic === 'profile') {

                res.message.addEventListener('ps-y-reach-end', () => {
                    if (this.intialId && this.allow) {
                        this.loadMore();
                    }
                    if (this.router.url === '/boards/profile' && this.allow) {
                        this.loadMore()
                    }
                })
            }
        })
    }


    writeArticle(type) {
        this.type = type
        this.uploadedFileType = type
    }

    goToCreations(type) {
        if (type === 'writings') {
            if (this.intialId) {
                let navigationExtras: NavigationExtras = {
                    queryParams: { "profileId": this.intialId, "friendState": this.friendState }
                };
                this.router.navigate(['/creations/writings'], navigationExtras);
            } else {
                this.router.navigate(['/creations/writings'])
            }

        } else if (type === 'comics') {
            if (this.intialId) {
                let navigationExtras: NavigationExtras = {
                    queryParams: { "profileId": this.intialId, "friendState": this.friendState }
                };
                this.router.navigate(['/creations/comics'], navigationExtras);
            } else {
                this.router.navigate(['/creations/comics'])
            }
        }
    }



    getMessage() {
        this.messageService.pushNotification('REQUEST_USER_PROFILE_DATA');
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





    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        // this.msgService.unsubscribe();
    }

    public filess;


    onSelectFile(event) {
        //console.log("event : " + JSON.stringify(event.target.files[0]))
        // this.files = [];
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
        this.uploadedFileType = 'video'
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

    getFriendStateChecked() {
        this.friendHandleService.getFriendState(this.user.id, this.intialId).subscribe(
            res => {
                if (res.body.length != 0) {
                    // alert('checking state' + JSON.stringify(res.body[0].accepted))
                    this.friendState = res.body[0].accepted;
                } else {
                    // alert('res is empty')
                }

                if (this.friendState) {
                    this.viewOtherProfile(this.intialId, res.body[0].accepted)
                }
                //correct line... this should be uncommented
            },
            err => {
                //console.log(JSON.stringify(err))
            }
        )
    }



    // deleteWarningMessage() {

    // }

    showImage(path: any) {
        // //console.log(path);
        // this.imgPost = JSON.parse(path);
        const dialogRef = this.dialog.open(PreviewDialogComponent, {
            width: '70vw',
            maxWidth: '100vw',
            maxHeight: '100vh',
            height: '90vh',


            data: { imageData: JSON.stringify(path), pictureType: "timeline", ownerName: this.map[path.postOwnerId].profileName, ownerImage: this.map[path.postOwnerId].profilePicture }

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
        this.files = [];
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
                height: '95vh',
                data: { postData: post, userId: this.user.id, comicTitle: comicName, coverPhoto: comicCover }
            })


        dialogRef.afterClosed().subscribe(result => {
            // alert(result)
            if (result) {
                this.router.navigateByUrl('/boards/profile/' + this.user.id, { skipLocationChange: false }).then(() =>
                    this.router.navigate(['/boards/profile/' + this.user.id]));
            }

        });

    }

    showNormalPostShare(post, previewSample) {
        //console.log("post is" + JSON.stringify(post)+previewSample)
        const dialogRef = this.dialog.open(ShareDialogComponent,
            {
                width: '70vw',
                height: '95vh',
                data: { postData: post, userId: this.user.id, coverPhoto: previewSample, content: post.imageUrl }
            })


        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.router.navigateByUrl('/boards/profile/' + this.user.id, { skipLocationChange: false }).then(() =>
                    this.router.navigate(['/boards/profile/' + this.user.id]));
            }
        });

    }

    sharePost(post) {
        //  alert("In function")
        this.sharePostDetails.postId = post.id;
        // //console.log("post  : " + JSON.stringify(post))

        if (post.category === "SHARED") {

            //console.log("In thw if")
            this.sharePostDetails.postId = post.originalPostId
        }

        if (post.catagory === "SHARED") {

            //console.log("In thw if")
            this.sharePostDetails.postId = post.originalPostId
        }


        //alert("ref: "+post.firstReferencePostId+"and post id"+post.id)

        this.sharePostDetails.createDate = new Date() != null ? moment(new Date(), DATE_TIME_FORMAT) : null;
        this.sharePostDetails.numberOfLikes = post.numberOfLikes;
        this.sharePostDetails.numberOfComments = post.numberOfComments;
        // this.sharePostDetails.sharedMassege = post.message;
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

    like(postId) {
        this.likedPostDetails.postId = postId;
        this.likedPostDetails.likedUserId = this.user.id;

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

                // //console.log("I am closed the deleted dialog box"+JSON.stringify(res))
                if (post.type === 'NOVEL' || post.type === 'COMIC') {
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





            }
        )




    }

    deleteNovel(post) {
        this.publicityService.deleteNovelPost(post.id).subscribe(
            res => {
                //console.log("deleted novel post" + JSON.stringify(res.body))
                this.getAllNewPosts();

                this.router.navigateByUrl('/boards/profile/' + this.user.id, { skipLocationChange: false }).then(() =>
                    this.router.navigate(['/boards/profile/' + this.user.id]));

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

                this.router.navigateByUrl('/boards/profile/' + this.user.id, { skipLocationChange: false }).then(() =>
                    this.router.navigate(['/boards/profile/' + this.user.id]));

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

                    this.router.navigateByUrl('/boards/profile/' + this.user.id, { skipLocationChange: false }).then(() =>
                        this.router.navigate(['/boards/profile/' + this.user.id]));

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
                //console.log("comment deleted")

                // Object.keys(this.mapComment).forEach((key)=>{

                //     if(key === comment.postId){

                //         alert(JSON.stringify(Object.values(this.mapComment[key])))


                //         let x = [];
                //         Object.values(this.mapComment[key]).forEach((value :any,index) =>{

                //             if(value.id !== comment.id){
                //                 x[index] = value
                //             }
                //         })
                //         this.mapComment[comment.postId] = [];
                //         this.mapComment[comment.postId] = x;
                //     }
                // })
                this.nextPageNumber = 0;
                this.mapComment[comment.postId] = [];
                this.getAllCommentsWithPagination(comment.postId, 'deleted')
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
                        this.nextPageNumber = 0;
                        this.mapComment[post.id] = []

                        this.getAllCommentsWithPagination(post.id, 'updateComments');
                    }


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
        // alert(JSON.stringify(this.imagePost.message))
        this.imagePost.postOwnerId = this.user.id;
        this.imagePost.category = 'UPLOAD'
        // this.imagePost.imageUrls = this.imageUrls;

        this.imagePost.createDate = new Date() != null ? moment(new Date(), DATE_TIME_FORMAT) : null;

        //  //console.log(JSON.stringify(this.imagePost));

        //   //console.log(this.imagePost);

        if (!this.imagePost.visible) {
            this.imagePost.visible = Visibility.PUBLIC;
        }

        if (this.files.length === 0 && this.content) {
            this.imagePost.imageUrl = this.content
            this.imagePost.imageUrls.push(this.content)
        } else if (this.uploadedFileType === 'video') {
            this.imagePost.imageUrls.push(this.imagePost.imageUrl)
        }

        if (this.uploadedFileType === 'ARTICLE') {
            this.imagePost.subType = 'ARTICLE'
        } else if (this.uploadedFileType === 'image') {
            this.imagePost.subType = 'image'
        } else if (this.uploadedFileType === 'video') {
            this.imagePost.subType === 'video'
        }
        //alert( this.imagePost.visible)

        //   //console.log(this.imagePost);

        this.imagePostService.create(this.imagePost).subscribe(
            res => {
                this.creating = false;
                //console.log("iMAGE UPLAOD SUCCESS" + JSON.stringify(res.body));
                if (res) {
                    this.router.navigateByUrl('/boards/profile/' + this.user.id, { skipLocationChange: false }).then(() =>
                        this.router.navigate(['/boards/profile/' + this.user.id]));
                }
                this.urls = [];
                this.files = [];
                this.imageUrls = [];
                this.imagePost.imageUrls = [];
                this.imagePost.message = null;
                this.content = '';
                this.uploadedFileType = '';
                // window.location.reload();
                // alert("res delivered");

                // setTimeout(() => {
                //     this.nextPostPagesNumber = 0;
                //     this.getAllNewPosts();
                //     this.matController = false;
                //     this.content = '';
                //     this.uploadedFileType = '';
                // }, 5000);


            },
            err => {
                //console.log("error uploading images: " + JSON.stringify(err));
                this.router.navigateByUrl('/boards/profile/' + this.user.id, { skipLocationChange: false }).then(() =>
                    this.router.navigate(['/boards/profile/' + this.user.id]));

                this.matController = false;
                this.files = [];
                this.urls = [];
                this.imageUrls = [];
                this.imagePost.imageUrls = [];
                this.imagePost.message = null;
                // this.getAllNewPosts();

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


    viewPublishedPage(post, id: String, pageId: string) {
        let novelId;
        novelId = post.id
        if (post.catagory === 'SHARED') {
            novelId = post.originalPostId
        } else {

        }

        let navigationExtras: NavigationExtras = {
            queryParams: { "novel": novelId, "page": pageId }
        };
        this.router.navigate(['/creations/viewContent/view'], navigationExtras);
    }

    viewPublishedComicPage(post, comicId: string, pageId: string) {
        let viewComicId;
        viewComicId = comicId
        if (post.catagory === 'SHARED') {
            viewComicId = post.originalPostId
        }
        let navigationExtras: NavigationExtras = {
            queryParams: { "comicID": viewComicId, "page": pageId, "actionType": 'view' }
        };

        this.router.navigate(['/creations/comic-editor'], navigationExtras)

    }






    getPostUserDetails(ids) {
        this.imagePostService.getPostUsersDetails(ids).subscribe(res => {

            this.map = res.body;
            this.cont = true;

        },
            err => {
                //console.log("error in getting post user details " + JSON.stringify(err));
            })
    }

    getAllNewPosts() {
        this.imagePostService.getNewPostsNMethod(this.user.id, this.nextPostPagesNumber).subscribe(
            res => {
                //console.log("getting all details" + JSON.stringify(res.body));
                if (this.nextPostPagesNumber === 0) {
                    this.messageService.pushNotification('scroll-topic', 'profile');
                }


                let exists = false;
                res.body.listPostDetails.forEach((item, index) => {
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
                    this.postDetails.creationsDetails.push(item)
                })

                res.body.postOwnerIds.forEach((item, index) => {
                    this.postDetails.postOwnerIds.push(item)
                })

                //   this.postDetails.listPostDetails.push(res.body.listPostDetails)
                // this.postDetails.postOwnerIds = res.body.postOwnerIds;
                // this.postDetails.creationsDetails = res.body.creationsDetails;



                if (this.postDetails.creationsDetails.length != 0) {
                    this.getAllCreationDetails(this.postDetails.creationsDetails)
                } else {
                    if (this.postDetails.postOwnerIds.length != 0) {
                        this.getPostUserDetails(this.postDetails.postOwnerIds);
                    }
                }


                this.nextPostPagesNumber++;
            },
            err => {
                //console.log("Error in getting list post details" + JSON.stringify(err))

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
        this.imagePostService.viewOtherProfile(id, friendState, this.user.id, this.nextPageOtherProfilePosts).subscribe(
            res => {
                if (this.nextPageOtherProfilePosts === 0) {
                    this.messageService.pushNotification('scroll-topic', 'profile');
                    this.messageService.pushNotification('othersIDforScroll', id)
                }


                let exists = false;
                res.body.listPostDetails.forEach((item, index) => {
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
                    this.postDetails.creationsDetails.push(item)
                })

                res.body.postOwnerIds.forEach((item, index) => {
                    this.postDetails.postOwnerIds.push(item)
                })

                //console.log("getting all details" + JSON.stringify(res.body));

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


                this.nextPageOtherProfilePosts++
                //  //console.log("post details  :   " + JSON.stringify(this.postDetails));

                //this.postDetails.push(res.body);
            },
            err => {
                //console.log("Error in getting list post details" + JSON.stringify(err))

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

    loadMore() {
        // alert("profile load more")

        if (this.intialId) {
            this.getFriendStateChecked();
        } else {
            this.getAllNewPosts();
        }

    }


    getAllCommentsWithPagination(postId, update?) {
        if (update === 'updateComments') {
            this.updateNumberOfCommemtsWithPagination(postId)
        }

        // if(update==='deleted'){
        //     this.updateNumberOfCommemtsWithPagination(postId,'yes')
        // }
        ////console.log(postId);
        this.publicityService.getAllComments(postId, this.nextPageNumber).subscribe(
            res => {
                // alert("Get All Comments " + JSON.stringify(res.body));

                if (res.body.commentPersons.length > 0) {
                    this.getUserDetailsForCommentsWithPagination(res.body, postId);
                }


            },
            err => {
                //console.log("Error in getting comments user details" + JSON.stringify(err));
            }
        )
    }

    getUserDetailsForCommentsWithPagination(commentFacts: FullCommentDetails, postId) {

        this.publicityService.getUsersOfComments(commentFacts.commentPersons).subscribe(
            (moreUserDetails) => {

                this.FullCommentDetails = commentFacts;

                if (this.mapCommentUsers.size === 0) {
                    this.mapCommentUsers = moreUserDetails.body;
                } else {

                    ////console.log("more usersssssssssssssss "+ JSON.stringify(Object.keys(this.temporyUsers)));

                    Object.keys(moreUserDetails.body).forEach(newkey => {

                        this.mapCommentUsers[newkey] = moreUserDetails.body[newkey];

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
    updateNumberOfCommemtsWithPagination(postId, deleted?) {
        // alert(JSON.stringify(mapComment[postId]));

        for (let post of this.postDetails.listPostDetails) {

            if (post.id === postId) {

                if (deleted === 'yes') {
                    post.numberOfComments = post.numberOfComments - 1;
                } else {
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
        this.creating = true;
        this.nextPostPagesNumber = 0;
        if (type === 'image' || type === 'ARTICLE') {
            //console.log("type : " + type)
            //console.log("uplaoding image files")

            this.uploadImage();
        } else if (type === 'video') {
            //console.log("type : " + type)
            //console.log("upoading video files")
            this.uploadVideo();
        }
    }

    uploadVideo() {
        this.matController = true;

        this.firebaseService.uploadVideoToFirebase(this.urls[0], this.user.id).then(
            (res: string[]) => {
                this.imagePost.imageUrl = res[0];
                this.imagePost.subType = 'video';
                this.postImages();
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
        if (this.files.length !== 0) {
            this.firebaseService.uploadImagesToFirebase(this.files).then(
                (res: string[]) => {
                    //console.log(res);
                    this.imagePost.imageUrls = res;
                    // this.matController = false;
                    this.urls = [];
                    this.files = [];
                    this.imageUrls = [];
                    this.postDetails.creationsDetails = [];
                    this.postDetails.listPostDetails = [];
                    this.postDetails.postOwnerIds = [];
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
        } else {
            this.postImages()
        }


    }



    getAllAdevrtisements() {
        return new Promise((resolve, reject) => {
            this.publicityService.getAdvertisements(this.landscapeAmount, this.portraitAmount).subscribe(
                res => {
                    resolve(res.body)
                }, err => {
                    reject(err)
                }
            )
        })
    }



}





/**
 * https://firebasestorage.googleapis.com/v0/b/artifex-c4411.appspot.com/o/posts%2FIMG-20170814-WA0005.jpg?alt=media&token=18212e83-289c-4cf5-918c-f6dc43d587c5
 * https://firebasestorage.googleapis.com/v0/b/artifex-c4411.appspot.com/o/posts%2FIMG-20170814-WA0004.jpg?alt=media&token=4cfe32a1-0b30-4163-b12a-48965ab00d23
 * https://firebasestorage.googleapis.com/v0/b/artifex-c4411.appspot.com/o/posts%2FIMG-20170814-WA0001.jpg?alt=media&token=89f5be94-fafe-434b-a686-fe59bffbb2a7
 * https://firebasestorage.googleapis.com/v0/b/artifex-c4411.appspot.com/o/posts%2FIMG-20170814-WA0011.jpg?alt=media&token=6c9dbcf1-04f7-4c38-9f5c-08cea54321f9
 * https://firebasestorage.googleapis.com/v0/b/artifex-c4411.appspot.com/o/posts%2FIMG-20170827-WA0025.jpg?alt=media&token=a8858682-b0d1-45cf-921c-825d997d54b0
 * https://firebasestorage.googleapis.com/v0/b/artifex-c4411.appspot.com/o/posts%2FIMG-20170827-WA0024.jpg?alt=media&token=964ffab1-7032-4018-bd47-ab5e8f512664
 */