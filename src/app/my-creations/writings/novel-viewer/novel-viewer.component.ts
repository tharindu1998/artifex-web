import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { IChapter, Chapter } from 'app/shared/model/creations/chapter.model';
import { DATE_TIME_FORMAT } from 'app/shared';
import * as moment from 'moment';
import { CreationService } from 'app/services/creation.service';
import { Writing } from 'app/shared/model/userProfile/writings.model';
import FroalaEditor from 'froala-editor';
import { IWritingPage, WritingPage } from 'app/shared/model/creations/page.model';
import { ILog, Log } from 'app/shared/model/creations/log.model';
import { MatDialog } from '@angular/material';
import { PublishNovelComponent } from 'app/publish-novel/publish-novel.component';
import { Principal, IUser, User } from 'app/core';
import { DialogBoxComponent } from 'app/dialog-box/dialog-box.component';
import { FuseConfigService } from '@fuse/services/config.service';
import { PostPublicityService } from 'app/services/post-publicity.service';
import { ILikes, Likes } from 'app/shared/model/userProfile/likes.model';
import { CommentDialogComponent } from 'app/comment-dialog/comment-dialog.component';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { ShareDialogComponent } from 'app/share-dialog/share-dialog.component';
import { FriendRequestService } from 'app/services/friend-request.service';

@Component({
    selector: 'app-novel-viewer',
    templateUrl: './novel-viewer.component.html',
    styleUrls: ['./novel-viewer.component.scss'],
    animations: fuseAnimations
})
export class NovelViewerComponent implements OnInit {
    shareWritingDetails: ILog;
    user: IUser;
    enableCreateChapter: boolean;
    lastChapter: any;
    pageIdParam: string;
    currentChapterId: string;
    publishingDetails: ILog;
    parameter: string;
    coverPhoto: string;
    openedPageId: string;
    //fullPageContent: IWritingPage;
    specifiedChapter: Chapter;
    newPageState: boolean;
    chapterHeading: IChapter;
    novelObject: string;
    novelDetails: Writing;
    // stepperDetails: Chapter;
    stepperDetails: any[];
    public content: string;
    imgOptions: false;
    actionType: string;
    panelOpenState: false;
    pageDetails: IWritingPage;
    mapPages = new Map();
    ids: string[];
    public type = 'initial'
    editingId: string;
    public saved = true;
    previousContent: string;
    mapPublicity = new Map()
    likes: any;
    likedPostDetails: ILikes;
    comments: any;
    shares: any;
    caption: string;
    fullPost: any;
    friendState: any;
    constructor(

        private router: Router,
        private activatedRoute: ActivatedRoute,
        private creationService: CreationService,
        private dialog: MatDialog,
        private principal: Principal,
        private fuseConfigService: FuseConfigService,
        private publicityService: PostPublicityService,
        private _fuseSidebarService: FuseSidebarService,
        private friendService: FriendRequestService

    ) {
        this.type = 'initial'
        this.actionType = this.activatedRoute.snapshot.paramMap.get('action');
        this.activatedRoute.queryParams.subscribe(
            params => {
                this.parameter = params["novel"];
                this.pageIdParam = params["page"];
                this.fullPost = params["post"]
                //console.log("sssssssssss" + JSON.stringify(this.parameter))
                this.getNovelDetails();

                if (this.pageIdParam) {
                    this.viewPage(this.pageIdParam)
                    this.getPages(this.parameter)
                    // this.getNovelDetails();
                }

                this.getAllChpaters(this.parameter);
                //    this.getPages(this.parameter);
            }
        )


        this.fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: false
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: false
                }
            }
        };
    }





    ngOnInit() {
        this.shareWritingDetails = new Log();
        this.user = new User();
        this.likedPostDetails = new Likes();
        this.chapterHeading = new Chapter();
        this.pageDetails = new WritingPage();
        this.publishingDetails = new Log();
        //  this.fullPageContent = new WritingPage();
        this.newPageState = false;

        this.principal.identity().then(
            account => {
                this.user = account
                this.getWritingPublicity();
                if(this.type==='view'){
                    this.caption = 'edit'
                }else{
                    this
                }
            }
        )

        //    this.novelObject = this.activatedRoute.snapshot.paramMap.get('novelDetails');

        // alert(this.actionType)
        // this.coverPhoto = this.activatedRoute.snapshot.paramMap.get('cover');

        // //console.log("cover photo: " + this.coverPhoto)
        //*ngIf="actionType==='view'"
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
        //   this.novelDetails = JSON.parse(this.novelObject);

        //console.log("This is parameter" + this.parameter)
    }

    likeWriting(postId) {
        this.likedPostDetails.postId = postId;
        this.likedPostDetails.likedUserId = this.user.id;
        this.likedPostDetails.likeDateTime = new Date()!=null? moment(new Date(),DATE_TIME_FORMAT):null;
        // alert(JSON.stringify(this.likedPostDetails))

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

    toggleSidebarFolded(): void {
        
        this._fuseSidebarService.getSidebar('navbar').toggleFold();
    }

    toggleSidebar(name): void {
        //console.log("calling here")
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

    updateLikes(totalNUmberOfLikes, postId: string) {

       

            // if (post.type==='IMAGE_POST') {
                this.mapPublicity[this.parameter].numberOfLikes = totalNUmberOfLikes
                this.likes = totalNUmberOfLikes;

                if(this.mapPublicity[this.parameter] && this.mapPublicity[this.parameter].liked){
                    this.mapPublicity[this.parameter].liked = false;
                }else{
                    this.mapPublicity[this.parameter].liked=true;
                }
             

            
            // }

  

    }

    getWritingPublicity(){
        this.publicityService.getPublicityCountForCreation(this.user.id,this.parameter).subscribe(
            res=>{
                this.mapPublicity = res.body;
                this.likes = this.mapPublicity[this.parameter].numberOfLikes
                this.comments = this.mapPublicity[this.parameter].numberOfComments
                this.shares = this.mapPublicity[this.parameter].numberOfShares
                // alert("wriitng likesss : "+JSON.stringify(res.body))
            },err=>{
                //console.log("error in getting the publicity")
            }
        )

        
    }


    viewWritingDetails(){
        this.type = 'initial'
    }

    commentWriting(){
       const dialogRef = this.dialog.open(CommentDialogComponent,{
           width:'800px',
           maxHeight: '100vh',
           data:{writingDetail:JSON.stringify(this.novelDetails),currentUser: this.user.id, commentCount: this.comments}
       }) 

       dialogRef.afterClosed().subscribe(
           res=>{
              
               if(res){
                this.comments = res
               }
              
           }
       )
    }

    updateNovelDetails() {
        let navigationExtras: NavigationExtras = {
            queryParams: { "novel": this.parameter }
          };
          this.router.navigate(['/creations/writingForm'], navigationExtras);
    }

    view() {


        //console.log('<span>' + this.content + '</span>');
    }
    changeMode(){
        if(this.type==='view'){
            this.type='edit';
            this.actionType='edit'
            this.caption = 'view'
        }else{
            this.type='view'
            this.actionType = 'view'
            this.caption = 'edit'
        }
    }

    goBack() {
        this.router.navigate(['creations/writings'])
    }

    getAllChpaters(writingId: string) {
        this.creationService.getChapter(writingId).subscribe(
            res => {
                //  alert("Chapters"+JSON.stringify(res.body))
                if (res.body.length === 0) {

                    this.enableCreateChapter = false;
                } else {

                    this.lastChapter = res.body[res.body.length - 1]
                    this.enableCreateChapter = !this.lastChapter.published;
                    // alert(JSON.stringify(res.body.length))
                }

                this.stepperDetails = res.body;

                // this.lastChapter = this.stepperDetails[this.stepperD];
                //console.log(this.stepperDetails)
            }, err => {
                //console.log("error in getting chapters" + err)
            }
        )
    }

    saveContent() {
        this.previousContent = this.pageDetails.content;
        // //console.log(this.content)
        //console.log(JSON.stringify(this.specifiedChapter))
        this.pageDetails.content = this.content;

        if (this.pageDetails.id) {

        } else {
            this.pageDetails.episoidId = this.specifiedChapter.id;
            this.pageDetails.type = this.specifiedChapter.type;
            this.pageDetails.createDate = new Date() != null ? moment(new Date(), DATE_TIME_FORMAT) : null;
        }
        // this.pageDetails.episoidId = this.specifiedChapter.id;
        // this.pageDetails.type = this.specifiedChapter.type;
        // this.pageDetails.createDate = new Date() != null ? moment(new Date(), DATE_TIME_FORMAT) : null;

        //console.log("Page details : "+JSON.stringify(this.pageDetails))
        this.creationService.createPage(this.pageDetails).subscribe(
            res => {
                this.saved = false;
                this.mapPages = res.body;
                this.enableCreateChapter = true;
                this.ids = this.mapPages[this.pageDetails.episoidId];
                this.pageDetails.id = this.ids[this.ids.length - 1];
                //console.log("final details " + JSON.stringify(this.pageDetails));
            },
            err => {
                //console.log("Error in saving the page details"+JSON.stringify(err))
                this.saved = false;
            }
        )
    }

    getNovelDetails() {
        this.creationService.getSpecificWriting(this.parameter).subscribe(
            res => {
                //console.log("Novel received  :  " + JSON.stringify(res.body))
                this.novelDetails = res.body;
                
            }, err => {
                //console.log("error in getting novel  " + JSON.stringify(err))
            }
        )
    }

    getPages(id: string) {
        //console.log("ID" + id)
        this.currentChapterId = id;
        this.creationService.getPage(id).subscribe(
            res => {
                this.mapPages = res.body;
                // alert("pages : "+JSON.stringify(this.mapPages))
            }, err => {
                //console.log("Error in getting pages")
            }
        )
    }


    // getFullSinglePageDetails(id: string){

    // }


    createPage(fullChapterDetails: Chapter) {
        this.enableCreateChapter = true;
        this.pageDetails = new WritingPage();
        this.content = '';
        this.specifiedChapter = fullChapterDetails;
        this.type = 'new';
        this.newPageState = true;
        this.saved = true;
        //console.log("Full chapter details are here" + JSON.stringify(fullChapterDetails))
    }

    cancelPage(){
        this.content = '';
        this.type = 'initial';
        

    }

    edit(id: string) {
        this.saved = true;
        this.type = 'edit';
        this.editingId = id;
        this.creationService.getFullPage(id).subscribe(
            res => {
                // this.fullPageContent = res.body;
                // this.openedPageId = this.fullPageContent.id;
                // this.content = this.fullPageContent.content;
                if(this.novelDetails.postOwnerId===this.user.id){
                    this.pageDetails = res.body;
                    this.openedPageId = this.pageDetails.id;
                    this.content = this.pageDetails.content;
                }else if(res.body.published){
                    if(res.body.visible==='PUBLIC'){
                        this.pageDetails = res.body;
                        this.openedPageId = this.pageDetails.id;
                        this.content = this.pageDetails.content;
                    } else if(res.body.visible==='ONLY_FRIENDS'){
                        this.getFriendState().then(
                            resP=>{
                                if(resP === 'FRIEND'){
                                    this.pageDetails = res.body;
                                    this.openedPageId = this.pageDetails.id;
                                    this.content = this.pageDetails.content;
                                }else{
                                    alert("You are not allowed to view this page")
                                }
                            }
                        )
                    }
                }
               
               
                //console.log("Edit getting details: " + JSON.stringify(res.body))
            }, err => {
                //console.log("error in getting full details : " + err)
            }
        )
    }
    getFriendState() {
        return new Promise((resolve,reject)=>{
            this.friendService.getFriendState(this.novelDetails.postOwnerId,this.user.id).subscribe(
                res=>{
                    if (res.body.length != 0) {
                        // alert('checking state' + JSON.stringify(res.body[0].accepted))
                        this.friendState = res.body[0].accepted
                        resolve(this.friendState)
                    } 
                }
            )
        })
        
    }

    viewPage(id: string) {
        this.type = 'view';
        this.openedPageId = id;
        this.creationService.getFullPage(id).subscribe(
            res => {
                let contents = res.body;
                if (contents.published) {
                    this.pageDetails = res.body;
                }else if(this.novelDetails.postOwnerId===this.user.id){
                    this.pageDetails = res.body
                }else{
                    alert("Sorry! Author still hasn't published this page")
                }


            },
            err => {
                //console.log("error in viewing the page" + JSON.stringify(err))
            }
        )
    }

    permissonMessage(detail,deleteType) {
        const dialogRef = this.dialog.open(DialogBoxComponent, {
            maxWidth: '50vw',

            data: {
                warningMessage: 'Are you sure you want to delete this post permanently?'
            }

        }

        );




        dialogRef.afterClosed().subscribe(
            res => {
                if(deleteType==='page') {
                    if(res) {
                        this.deleteWritingPage(detail)
                    }
                }

                if(deleteType==='chapter'){
                    if(res) {
                        this.deleteChapter(detail)
                    }
                }
               
              





            }
        )




    }

    deleteChapter(chapterToDelete: Chapter){
        this.creationService.deleteChapter(chapterToDelete.id).subscribe(
            res=>{
                //console.log("chapter deleted"+JSON.stringify(res.body))
                this.getAllChpaters(this.parameter)
            },
            err=>{
                //console.log("cannot delete chapter"+JSON.stringify(err))
            }
        )
    }

    deleteWritingPage(id: string){
            this.creationService.deletePage(id).subscribe(
                res=>{
                    //console.log("page deleted")
                    this.getPages(this.currentChapterId)
                },
                err=>{
                    //console.log("err in deleting writng page"+JSON.stringify(err))
                }
            )
    }

    createChapter() {
        if(this.chapterHeading.chapter==='') {
            // alert("Chapter Name Required")
        }else{
            this.chapterHeading.mainPostid = this.parameter;
            this.chapterHeading.createDate = new Date() != null ? moment(new Date(), DATE_TIME_FORMAT) : null;
            this.chapterHeading.type = 'NOVEL';
            this.chapterHeading.category = 'UPLOAD';
    
            this.creationService.createChapter(this.chapterHeading).subscribe(
                res => {
                    this.stepperDetails = res.body;
                    this.enableCreateChapter = true;
                    //console.log("Chapter created" + JSON.stringify(res.body))
                    this.chapterHeading.chapter = '';
                }, err => {
                    //console.log("Error in creating the chapter")
                }
            )
        }
       


    }


    shareWriting(){

        
        const dialogRef = this.dialog.open(ShareDialogComponent,
            {
                width:'70vw',
                data:{ shareType:'shareWriting',writingId: this.parameter, openedPageId: this.openedPageId, writingDetail: this.novelDetails, userId: this.user.id, coverPhoto: this.novelDetails.imageUrl,type:'NOVEL' }
            })
    }

    publish() {
        const dialogRef = this.dialog.open(PublishNovelComponent,
            {
                width: '100vw',
                // maxHeight: '50vh',

                data: { novelId: this.parameter, chapterId: this.currentChapterId, type: 'writing' }
            }

        );


        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.checkChapterPublicisty();
            }
        });
    }

    checkChapterPublicisty() {
        this.creationService.publicityChecker(this.currentChapterId).subscribe(
            res => {
                //console.log("Chapter got publicity true" + JSON.stringify(res.body))
                this.lastChapter = res.body.id;
                this.enableCreateChapter = false;
            }, err => {
                //console.log("Getting error in setting publicity true" + JSON.stringify(err))
            }
        )
    }


}
