import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { CreationService } from 'app/services/creation.service';
import { IComicDetails, ComicDetails } from 'app/shared/model/creations/comicDetails.model';
import { fuseAnimations } from '@fuse/animations';
import { IComicPageDetails, ComicPageDetails } from 'app/shared/model/creations/comicPage.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ComicTemplatesComponent } from 'app/comic-templates/comic-templates.component';
import { DATE_TIME_FORMAT } from 'app/shared';
import * as moment from 'moment';
import { FirebaseService } from 'app/services/firebase.service';
import { PublishNovelComponent } from 'app/publish-novel/publish-novel.component';
import { DialogBoxComponent } from 'app/dialog-box/dialog-box.component';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { PostPublicityService } from 'app/services/post-publicity.service';
import { element } from '@angular/core/src/render3';
import { ILikes, Likes } from 'app/shared/model/userProfile/likes.model';
import { CommentDialogComponent } from 'app/comment-dialog/comment-dialog.component';
import { ShareDialogComponent } from 'app/share-dialog/share-dialog.component';
import { FriendRequestService } from 'app/services/friend-request.service';

@Component({
  selector: 'app-comic-editor',
  templateUrl: './comic-editor.component.html',
  styleUrls: ['./comic-editor.component.scss'],
  animations: fuseAnimations
})
export class ComicEditorComponent implements OnInit {
  animationDirection: 'left' | 'right' | 'none';
  existingPageId: string;
  public saving = false;
  saved: boolean;
  comicPages: any[];
  imagePosition: number;
  comicImageUrls: string[] = [];
  eve: EventTarget;
  comicDetails: IComicDetails
  comicPageDetails = [];
  comicPageSaveDetails: IComicPageDetails;
  comicPage: ComicPageDetails;
  templateId: string;
  files: File[] = [];
  firebaseFiles: File[] = [];
  urls: string[];
  comicImage1: string;
  comicImage2: string;
  comicImage3: string;
  comicImage4: string;
  comicImage5: string;
  comicImage6: string;
  mapPublicity = new Map();
  imageMap = new Map();
  actionType: string;
  im: string
  artdenComicId: string;
  artdenComicPage: string;
  currentViewingPage: any;
  otherPerson: any;
  userId: any;
  likes: any;
  comments: any;
  shares: any;
  likedPostDetails: ILikes;
  type: string;
  friendState: any;

  constructor(
    private activatedRouter: ActivatedRoute,
    private creationService: CreationService,
    private dialog: MatDialog,
    private router: Router,
    private firebaseService: FirebaseService,
    private fuseConfigService: FuseConfigService,
    private _fuseSidebarService: FuseSidebarService,
    private publicityService: PostPublicityService,
    private snackBar: MatSnackBar,
    private friendService: FriendRequestService

  ) {

    this.fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: false
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: false
        }
      }
    };
  }

  ngOnInit() {
    this.likedPostDetails = new Likes();
    this.comicPageSaveDetails = new ComicPageDetails();
    this.comicDetails = new ComicDetails();
    this.activatedRouter.queryParams.subscribe(
      params => {

        this.comicDetails.id = params["comicId"]
        this.actionType = params["actionType"];
        this.artdenComicId = params["comicID"];
        this.artdenComicPage = params["page"];
        this.otherPerson = params['otherPerson']
        this.userId = params['userId']

        if (!this.actionType || this.actionType === 'create') {
          this.type = 'initial'
        }

        if (this.artdenComicId) {
          //this.getComicPublicity();
          // alert(this.artdenComicId)
          this.getComicsBasicDetails(this.artdenComicId);

        } else {
          // alert("from com.id " + this.comicDetails.id)
          this.getComicsBasicDetails(this.comicDetails.id);
          //this.getComicPublicity();

        }

        this.imagePosition = 0;
        this.saved = false;
        // alert(this.actionType)
      }
    )
  }

  CancelTemplate() {
    this.type = 'initial'
    this.existingPageId = null
    this.actionType = 'create'
    this.templateId = null;
    this.comicImage1 = null;
    this.comicImage2 = null;
    this.comicImage3 = null;
    this.comicImage4 = null;
    this.comicImage5 = null;
    this.comicImage6 = null;
    this.comicPageSaveDetails = new ComicPageDetails()
    // this.comicPageSaveDetails.comicImage1 = null;
    // this.comicPageSaveDetails.comicImage2 = null;
    // this.comicPageSaveDetails.comicImage3 = null;
    // this.comicPageSaveDetails.comicImage4 = null;
    // this.comicPageSaveDetails.comicImage5 = null;
    // this.comicPageSaveDetails.comicImage6 = null;
    // this.comicPageSaveDetails.mainPostId = null;
    // this.comicPageSaveDetails.templateId = null;


  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  getComicsBasicDetails(comicId) {
    this.creationService.getSpecifiedComic(comicId).subscribe(
      res => {



        // alert("comic details: "+JSON.stringify(res.body))
        this.comicDetails = res.body;


        if (this.artdenComicId) {
          this.getComicPages(this.artdenComicId);
        } else {
          this.getComicPages(this.comicDetails.id);
        }
        // alert("Detaislsss"+JSON.stringify(this.comicDetails))
      }, err => {
        //console.log("errorrrr" + JSON.stringify(err))
      }
    )
  }

  getComicPublicity() {
    this.publicityService.getPublicityCountForCreation(this.userId, this.comicDetails.id).subscribe(
      res => {
        this.mapPublicity = res.body;
        this.likes = this.mapPublicity[this.comicDetails.id].numberOfLikes
        this.comments = this.mapPublicity[this.comicDetails.id].numberOfComments
        this.shares = this.mapPublicity[this.comicDetails.id].numberOfShares
        // alert(JSON.stringify(res.body))
      }
    )
  }

  likeComic(postId) {
    this.likedPostDetails.postId = postId;
    this.likedPostDetails.likedUserId = this.userId;
    this.likedPostDetails.likeDateTime = new Date() != null ? moment(new Date(), DATE_TIME_FORMAT) : null;
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

  updateLikes(totalNUmberOfLikes, postId: string) {



    // if (post.type==='IMAGE_POST') {
    this.mapPublicity[this.comicDetails.id].numberOfLikes = totalNUmberOfLikes
    this.likes = totalNUmberOfLikes;

    if (this.mapPublicity[this.comicDetails.id] && this.mapPublicity[this.comicDetails.id].liked) {
      this.mapPublicity[this.comicDetails.id].liked = false;
    } else {
      this.mapPublicity[this.comicDetails.id].liked = true;
    }



    // }



  }

  commentComic() {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '800px',
      maxHeight: '100vh',
      data: { writingDetail: JSON.stringify(this.comicDetails), currentUser: this.userId, commentCount: this.comments }
    })

    
  }


  getComicPages(comicId) {

    this.creationService.getComicPage(comicId).subscribe(
      res => {
        // //console.log("COmic page details" + JSON.stringify(res.body))
        if (!this.otherPerson) {
          this.comicPageDetails = res.body;
        } else {
        
          let exists = false;
          res.body.forEach(comicPage => {
            this.comicPageDetails.forEach(elementPage => {
              if (comicPage.id === elementPage.id) {
                exists = true;
              }


            })

            if (!exists) {
              if (comicPage.published) {
                this.comicPageDetails.push(comicPage)
              }
            }
          })
        }

        if (this.artdenComicId) {
          this.viewPage(this.artdenComicPage)
        }

        this.getComicPublicity();

      }, err => {
        //console.log("error in getting pages comics" + JSON.stringify(err))
      }
    )
  }

  createComic() {
    // this.comicPageSaveDetails.comicImage1 = null;
    // this.comicPageSaveDetails.comicImage2 = null;
    // this.comicPageSaveDetails.comicImage3 = null;
    // this.comicPageSaveDetails.comicImage4 = null;
    // this.comicPageSaveDetails.comicImage5 = null;
    // this.comicPageSaveDetails.comicImage6 = null;
    this.comicPageSaveDetails = new ComicPageDetails()
    this.actionType = 'create';
    this.type = 'create'
    const dialogRef = this.dialog.open(ComicTemplatesComponent, {

      width: '48vw',
      height: '77vh'
      // maxHeight: '50vh'

      // data: { error1: message }

    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log("Selected template: " + result)
      this.templateId = result;
      this.urls = [];
      this.files = [];
      this.comicImage1 = null;
      this.comicImage2 = null;
      this.comicImage3 = null;
      this.comicImage4 = null;
      this.comicImage5 = null;
      this.comicImage6 = null;
    });
  }


  goBack() {
    this.router.navigate(['/creations/comics'])
  }





  onSelectFile(event, imageNumber) {

    //console.log(imageNumber)

    //console.log("event : " + JSON.stringify(event.target.files[0]))

    this.urls = [];



    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      this.eve = event.target.files;
      //   //console.log("event : " + JSON.stringify(event.target.files[0]))
      var reader: any,
        target: EventTarget;
      reader = new FileReader();

      //this.files.push(event.target.files.item(0));
      if (imageNumber === "comicImage1") {
        this.firebaseFiles[0] = event.target.files.item(0);
        // //console.log("CI1" + this.comicImage1)
      } else if (imageNumber === 'comicImage2') {
        this.firebaseFiles[1] = event.target.files.item(0);

      } else if (imageNumber === 'comicImage3') {
        this.firebaseFiles[2] = event.target.files.item(0);
      } else if (imageNumber === 'comicImage4') {
        this.firebaseFiles[3] = event.target.files.item(0);
      } else if (imageNumber === 'comicImage5') {
        this.firebaseFiles[4] = event.target.files.item(0);
      } else if (imageNumber === 'comicImage6') {
        this.firebaseFiles[5] = event.target.files.item(0);
      }

      // this.firebaseFiles.forEach(element => {
      //   alert(element)
      // });

      reader.onload = (event) => {

        this.urls.push(event.target.result);
        // this.comicImage = `url(${this.urls[0]})`

        this.actionType = 'edit'
        if (imageNumber === "comicImage1") {
          this.comicImage1 = `url(${this.urls[0]})`
        } else if (imageNumber === 'comicImage2') {
          this.comicImage2 = `url(${this.urls[0]})`

        } else if (imageNumber === 'comicImage3') {
          this.comicImage3 = `url(${this.urls[0]})`
        } else if (imageNumber === 'comicImage4') {
          this.comicImage4 = `url(${this.urls[0]})`
        } else if (imageNumber === 'comicImage5') {
          this.comicImage5 = `url(${this.urls[0]})`
        } else if (imageNumber === 'comicImage6') {
          this.comicImage6 = `url(${this.urls[0]})`
        }
      }

      reader.readAsDataURL(event.target.files[0]);







    }

    this.urls = [];

  }



  updateComicDetails() {
    let navigationExtras: NavigationExtras = {
      queryParams: { "comicId": this.comicDetails.id }
    };
    this.router.navigate(['/creations/comic-form'], navigationExtras);
  }


  uploadImagesToFirebase() {
    return new Promise((resolve, reject) => {

      this.firebaseService.uploadComicImageToFirebase(this.firebaseFiles, 'comicInternalImages').then(
        (res: string[]) => {
          this.comicImageUrls = res;
          this.files = [];
          this.firebaseFiles = [];
          //console.log(this.comicImageUrls)
          resolve(this.comicImageUrls)
          // //console.log(JSON.stringify)
        }, err => {
          //console.log("error" + JSON.stringify(err));
          reject(err)
        }
      );
    });
  }

  controlMode(page, mode) {
    if (mode === 'edit') {
      // this.existingPageId = page.id
      this.comicPageSaveDetails = page;
      // alert(JSON.stringify(this.comicPageSaveDetails))
      this.actionType = 'edit';
      this.type = 'edit'
      this.viewPage(page.id)
    }

    if (mode === 'view') {
      // this.existingPageId = page
      this.actionType = 'view';
      this.type = 'view'
      this.viewPage(page.id)
    }
  }

  viewInitial() {
    this.type = 'initial';
    this.CancelTemplate()
  }



  viewPage(pageId) {
    this.currentViewingPage = pageId;
    this.comicImage1 = null;
    this.comicImage2 = null;
    this.comicImage3 = null;
    this.comicImage4 = null;
    this.comicImage5 = null;
    this.comicImage6 = null;
    // this.actionType='view';
    this.creationService.getSpecificComicPage(pageId).subscribe(
      res => {
        // //console.log(JSON.stringify(res.body));
        if (this.comicDetails.postOwnerId === this.userId) {
          // alert("owner")
          this.comicPage = res.body;

          this.templateId = this.comicPage.templateId;


          if (this.comicPage.comicImage1) {
            this.comicImage1 = `url(${this.comicPage.comicImage1})`
          }
          if (this.comicPage.comicImage2) {
            this.comicImage2 = `url(${this.comicPage.comicImage2})`

          }

          if (this.comicPage.comicImage3) {
            this.comicImage3 = `url(${this.comicPage.comicImage3})`
          }
          if (this.comicPage.comicImage4) {
            this.comicImage4 = `url(${this.comicPage.comicImage4})`
          }
          if (this.comicPage.comicImage5) {
            this.comicImage5 = `url(${this.comicPage.comicImage5})`
          }
          if (this.comicPage.comicImage6) {
            this.comicImage6 = `url(${this.comicPage.comicImage6})`
          }

        } else if (res.body.published) {
          // alert("published")
          if (res.body.visible === 'PUBLIC') {
            // alert("public")
            this.comicPage = res.body;

            this.templateId = this.comicPage.templateId;


            if (this.comicPage.comicImage1) {
              this.comicImage1 = `url(${this.comicPage.comicImage1})`
            }
            if (this.comicPage.comicImage2) {
              this.comicImage2 = `url(${this.comicPage.comicImage2})`

            }

            if (this.comicPage.comicImage3) {
              this.comicImage3 = `url(${this.comicPage.comicImage3})`
            }
            if (this.comicPage.comicImage4) {
              this.comicImage4 = `url(${this.comicPage.comicImage4})`
            }
            if (this.comicPage.comicImage5) {
              this.comicImage5 = `url(${this.comicPage.comicImage5})`
            }
            if (this.comicPage.comicImage6) {
              this.comicImage6 = `url(${this.comicPage.comicImage6})`
            }

          } else if (res.body.visible === 'ONLY_FRIENDS') {
            this.getFriendState().then(
              resP => {
                if (resP === 'FRIEND') {
                 // alert("heree")
                  this.comicPage = res.body;


                  this.templateId = this.comicPage.templateId;


                  if (this.comicPage.comicImage1) {
                    this.comicImage1 = `url(${this.comicPage.comicImage1})`
                  }
                  if (this.comicPage.comicImage2) {
                    this.comicImage2 = `url(${this.comicPage.comicImage2})`

                  }

                  if (this.comicPage.comicImage3) {
                    this.comicImage3 = `url(${this.comicPage.comicImage3})`
                  }
                  if (this.comicPage.comicImage4) {
                    this.comicImage4 = `url(${this.comicPage.comicImage4})`
                  }
                  if (this.comicPage.comicImage5) {
                    this.comicImage5 = `url(${this.comicPage.comicImage5})`
                  }
                  if (this.comicPage.comicImage6) {
                    this.comicImage6 = `url(${this.comicPage.comicImage6})`
                  }

                } else {


                }
              }
            )
          } 
        }else{
          this.CancelTemplate()
          // alert("You are not allowed to view this page")

        }









        //console.log("page arrived" + JSON.stringify(res.body))
      }, err => {
        //console.log("Error in getting page" + JSON.stringify(err))
      }
    )
  }

  getFriendState() {
    return new Promise((resolve, reject) => {
      this.friendService.getFriendState(this.comicDetails.postOwnerId, this.userId).subscribe(
        res => {
          if (res.body.length != 0) {

            this.friendState = res.body[0].accepted
            resolve(this.friendState)
          }
        }
      )
    })
  }

  showShareDialog(post, ) {
    const dialogRef = this.dialog.open(ShareDialogComponent,
      {
        width: '70vw',
        height: '95vh',
        data: { postData: post, userId: this.userId, comicTitle: this.comicDetails.comicName, coverPhoto: this.comicDetails.coverPhoto, openedPageId: this.currentViewingPage, shareType: 'shareComic' }
      })


    dialogRef.afterClosed().subscribe(result => {
      // alert(result)
      if (result) {

      }

    });

  }



  saveComicImages(ImageNumber: string) {

    this.saving = true;

    this.uploadImagesToFirebase().then(
      (res: string[]) => {
        this.saving = false;



        res.forEach((item, index) => {

          if (item.includes("comicImage0")) {
            this.comicPageSaveDetails.comicImage1 = item;

          } else if (item.includes("comicImage1")) {
            this.comicPageSaveDetails.comicImage2 = item;

          } else if (item.includes("comicImage2")) {
            this.comicPageSaveDetails.comicImage3 = item;
          } else if (item.includes("comicImage3")) {
            this.comicPageSaveDetails.comicImage4 = item;
          } else if (item.includes("comicImage4")) {
            this.comicPageSaveDetails.comicImage5 = item;
          } else if (item.includes("comicImage5")) {
            this.comicPageSaveDetails.comicImage6 = item;
          }


        })

        // if(this.existingPageId){
        //   this.comicPageSaveDetails.id = this.existingPageId
        // }
        this.comicPageSaveDetails.mainPostId = this.comicDetails.id;
        this.comicPageSaveDetails.createDate = new Date() != null ? moment(new Date(), DATE_TIME_FORMAT) : null;
        this.comicPageSaveDetails.templateId = this.templateId;
        this.comicPageSaveDetails.type = 'COMIC';
        this.comicPageSaveDetails.visible = this.comicDetails.visible;
        //console.log(JSON.stringify(this.comicPageSaveDetails))

        this.creationService.saveComicPage(this.comicPageSaveDetails).subscribe(
          res => {
            if (this.comicPageSaveDetails.id) {
              this.openSnackBar("Comic page saved successfully", "OK")
            }
            // this.comicPageDetails = res.body;
            this.actionType = 'create'
            this.firebaseFiles = [];
            // this.currentViewingPage = this.comicPageDetails[0].id
            // alert(this.comicDetails.id)
            this.getComicPages(this.comicDetails.id);
          }, err => {
            //this.getComicPages(this.comicDetails.id);
          }
        )

      }
    )
  }

  // saveComicImage(ImageNumber: string) {
  //   this.saving = true;

  //   this.uploadImagesToFirebase().then(
  //     (res: string[]) => {
  //       this.saving = false;
  //       if (ImageNumber === "comicImage1") {
  //         this.comicPageSaveDetails.comicImage1 = res[0];
  //       }
  //       if (ImageNumber === "comicImage2") {
  //         this.comicPageSaveDetails.comicImage2 = res[1];
  //       }

  //       if (ImageNumber === "comicImage3") {
  //         this.comicPageSaveDetails.comicImage3 = res[2];
  //       }

  //       if (ImageNumber === 'comicImage4') {
  //         this.comicPageSaveDetails.comicImage4 = res[3];
  //       }

  //       if (ImageNumber === 'comicImage5') {
  //         this.comicPageSaveDetails.comicImage5 = res[4];
  //       }
  //       if (ImageNumber === 'comicImage6') {
  //         this.comicPageSaveDetails.comicImage6 = res[5];
  //       }

  //       this.comicPageSaveDetails.mainPostId = this.comicDetails.id;
  //       this.comicPageSaveDetails.createDate = new Date() != null ? moment(new Date(), DATE_TIME_FORMAT) : null;
  //       this.comicPageSaveDetails.templateId = this.templateId;
  //       this.comicPageSaveDetails.type = 'COMIC';
  //       this.comicPageSaveDetails.visible = this.comicDetails.visible;
  //       //console.log(JSON.stringify(this.comicPageSaveDetails))


  //     }
  //   )
  // }

  getDetails() {

  }

  savePage() {
    // alert(this.comicDetails.id)
    // alert(this.comicPageSaveDetails)
    // this.creationService.saveComicPage(this.comicPageSaveDetails).subscribe(
    //   res => {
    //     // this.comicPageDetails = res.body;
    //     this.actionType = 'create'
    //     // this.currentViewingPage = this.comicPageDetails[0].id
    //     // alert(this.comicDetails.id)
    //     this.getComicPages(this.comicDetails.id);
    //   }, err => {
    //     //this.getComicPages(this.comicDetails.id);
    //   }
    // )
  }

  saveComicPage() {
    this.saved = true;
    //console.log("THESE ARE THE FILES" + this.files)

    // //console.log("image map : "+ this.imageMap)

    // this.uploadImagesToFirebase().then(
    //   (res: string[]) => {
    //     this.comicPageSaveDetails.comicImages = res;
    //     this.comicPageSaveDetails.mainPostId = this.comicDetails.id;
    //     this.comicPageSaveDetails.createDate = new Date() != null ? moment(new Date(), DATE_TIME_FORMAT) : null;
    //     this.comicPageSaveDetails.templateId = this.templateId;
    //     this.comicPageSaveDetails.type = 'COMIC';
    //     this.comicPageSaveDetails.visible = this.comicDetails.visible;

    //     // this.creationService.saveComicPage(this.comicPageSaveDetails).subscribe(
    //     //   res => {
    //     //     //console.log("comic page saved" + JSON.stringify(res.body))
    //     //     this.comicPageDetails = res.body;
    //     //     this.getComicPages();
    //     //     this.saved = false;
    //     //   }, err => {
    //     //     this.getComicPages();
    //     //     //console.log("error in saving page comic")
    //     //     this.saved = false;
    //     //   }
    //     // )

    //   }, err => {
    //     //console.log("Images not uploaded")
    //   }
    // )

  }


  publish() {
    const dialogRef = this.dialog.open(PublishNovelComponent,
      {
        width: '100vw',
        // maxHeight: '50vh',

        data: { comicId: this.comicDetails.id, type: 'comic' }
      }

    );


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.setComicPublicity();
      }
    });
  }
  setComicPublicity() {
    this.creationService.publishComic(this.comicDetails.id).subscribe(
      res => {
        this.openSnackBar("Comic published successfully", 'Done')
      }, err => {
        this.openSnackBar("Comic published successfully", 'Done')
      }
    )
  }

  deletePermission(pageId) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      maxWidth: '50vw',

      data: {
        warningMessage: 'Are you sure you want to delete this post permanently?'
      }

    }

    );




    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          this.deleteComicPagePermament(pageId);
        }







      }
    )
  }


  deleteComicPagePermament(pageId) {
    this.creationService.deleteComicPage(pageId).subscribe(
      res => {
        if (this.currentViewingPage === pageId) {
          this.CancelTemplate();
        }
        //console.log("comic page deleted" + JSON.stringify(res.body))
        this.getComicPages(this.comicDetails.id)
      }, err => {
        //console.log("comic page cannot delete" + JSON.stringify(err))
      }
    )
  }


  editMode() {
    this.actionType = 'edit'
    this.type = 'edit'
  }

  toggleSidebar(name): void {
    //console.log("calling here")
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

}
