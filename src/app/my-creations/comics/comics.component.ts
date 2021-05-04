import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { CreationService } from 'app/services/creation.service';
import { IComicDetails, ComicDetails } from 'app/shared/model/creations/comicDetails.model';
import { MatDialog } from '@angular/material';
import { ComicTemplatesComponent } from 'app/comic-templates/comic-templates.component';
import { MessageTestService } from 'app/services/messageTest.service';
import { Principal, IUser, User } from 'app/core';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss'],
  animations: fuseAnimations
})
export class ComicsComponent implements OnInit {
  public show = false;
  // comicDetails: IComicDetails;
  user: IUser;
  comicDetails: any[] = [];
  otherProfileID: any;
  friendStatus: any;
  constructor(
    private router: Router,
    private creationService: CreationService,
    private dialog: MatDialog,
    private messageService: MessageTestService,
    private principal: Principal,
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
              this.getComics(this.otherProfileID)
            }else{
              this.getComics(this.user.id)
            }
          }
        )
       
      }, err => {
        //console.log("error in user" + JSON.stringify(err))
      }
    )


    // this.comicDetails = new ComicDetails();
  }

  createComic() {
    this.router.navigate(['/creations/comic-form']);
  }

  goBack() {
    this.router.navigate(['/creations'])
  }


  selectTemplate(message: string) {

    const dialogRef = this.dialog.open(ComicTemplatesComponent, {

      width: '60vw',
      // maxHeight: '50vh'

      // data: { error1: message }

    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }


  


  deleteComicSpecific (comicBook) {
    this.creationService.deleteComicBook(comicBook.id).subscribe(
      res=>{
        //console.log("comic book deleted : "+ res.body)
      },err=>{
        //console.log("errorrr in deleting comic book"+JSON.stringify(err))
      }
    )
  }

  goToEditor(comic,actionType) {
    let navigationExtras: NavigationExtras = {
      queryParams: { "comicId": comic.id, "actionType": actionType, otherPerson: this.otherProfileID, userId: this.user.id }
    }
    this.router.navigate(['creations/comic-editor'], navigationExtras);
  }

  getComics(profileId) {

    if(this.otherProfileID){
      this.creationService.getOthersAllComics(profileId, this.friendStatus).subscribe(
        res => {
          this.comicDetails = res.body;
          //console.log("All the comic arrivved: " + JSON.stringify(this.comicDetails))
        },
        err => {
          //console.log("error in getting all the comics" + JSON.stringify(err));
        }
      )
    }else{
      this.creationService.getAllComics(profileId).subscribe(
        res => {
          this.comicDetails = res.body;
          //console.log("All the comic arrivved: " + JSON.stringify(this.comicDetails))
        },
        err => {
          //console.log("error in getting all the comics" + JSON.stringify(err));
        }
      )
    }


   
  }

}
