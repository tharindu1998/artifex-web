import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreationService } from 'app/services/creation.service';
import { fuseAnimations } from '@fuse/animations';
import { ILog, Log } from 'app/shared/model/creations/log.model';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared';
import { Principal, IUser, User } from 'app/core';
import { Visibility } from 'app/shared/model/userProfile/visibility.model';
import { IComicPageDetails, ComicPageDetails } from 'app/shared/model/creations/comicPage.model';
export interface DialogData {
  novelId: string,
  chapterId: string,
  type: string,
  comicId: string
}
@Component({
  selector: 'app-publish-novel',
  templateUrl: './publish-novel.component.html',
  styleUrls: ['./publish-novel.component.scss'],
  animations: fuseAnimations
})
export class PublishNovelComponent implements OnInit {
  public setVisible: Visibility.PUBLIC;
  public uploading = false;
  comicPages: ComicPageDetails[]=[];
  user: IUser;
  publishDetails: ILog;
  selected: string;
  pageIdToPublish: string;
  mapPages = new Map();
  constructor(
    private principal: Principal,
    private creationService: CreationService,
    public dialogRef: MatDialogRef<PublishNovelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    this.user = new User();
    this.publishDetails = new Log();
    
    this.principal.identity().then(
      account => {
        this.user = account;
        if (this.data.chapterId) {
          this.getNovelPages();
        }
        if (this.data.comicId) {
          this.getComicPages();
        }

        this.selected = null;
        //  this.setVisible = Visibility.ONLY_FRIENDS;
      }
    )



  }

  getNovelPages() {
    //console.log("Chapterrrrrrrrrr" + this.data.chapterId)
    this.creationService.getPage(this.data.chapterId).subscribe(
      res => {
        //console.log(JSON.stringify(res.body))
        this.mapPages = res.body;
      }, err => {
        //console.log("Error in getting pages")
      }
    )
  }

  check(pageId: string) {
    this.selected = pageId;

    this.pageIdToPublish = pageId;
    //console.log("this is the pag id" + pageId)
  }


  shareToArtden(){
    
  }

  publishToArtden() {
    this.uploading = true
    this.publishDetails.firstReferencePostId = this.pageIdToPublish;
    this.publishDetails.category = 'UPLOAD';
    this.publishDetails.createDateTime = new Date() != null ? moment(new Date(), DATE_TIME_FORMAT) : null;


    this.publishDetails.postOwnerId = this.user.id;
    if (this.data.chapterId) {
      this.publishDetails.type = 'NOVEL';
      this.publishDetails.postId = this.data.novelId;
    }
    if (this.data.comicId) {
      this.publishDetails.type = 'COMIC';
      this.publishDetails.postId = this.data.comicId;
    }

    this.publishDetails.visible = this.setVisible;

    // alert(JSON.stringify(this.publishDetails))

    this.creationService.publishChapter(this.publishDetails).subscribe(
      res => {
        //console.log("Chapter published successfulyy" + JSON.stringify(res));
        this.uploading = false
        this.dialogRef.close(true);
      }, err => {
        //console.log("error in publishing chapter " + JSON.stringify(err))
        this.uploading = false;
        this.dialogRef.close(false);
      }
    )

  }




  getComicPages() {
    this.creationService.getComicPage(this.data.comicId).subscribe(
      res => {
        this.comicPages = res.body
        //console.log(JSON.stringify(this.comicPages))

      }, err => {
        //console.log("cannot get comic pages" + JSON.stringify(err))
      }
    )
  }

}
