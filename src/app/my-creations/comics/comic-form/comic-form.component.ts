import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { IComicDetails } from 'app/shared/model/creations/comicDetails.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Visibility } from 'app/shared/model/userProfile/visibility.model';
import { CreationService } from 'app/services/creation.service';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared';
import { Principal, IUser, User } from 'app/core';
import { FirebaseService } from 'app/services/firebase.service';
import { MatSnackBar } from '@angular/material';
import { PostPublicityService } from 'app/services/post-publicity.service';

@Component({
  selector: 'app-comic-form',
  templateUrl: './comic-form.component.html',
  styleUrls: ['./comic-form.component.scss'],
  animations: fuseAnimations
})
export class ComicFormComponent implements OnInit {
  ads: string;
  land1: string;
  land2: string;
  user: IUser;
  comicDetails: IComicDetails;
  coverPhoto: string;
  files: File[] = [];
  urls: string[] = [];
  public selected = Visibility.PUBLIC;
  eve: EventTarget;
  public imgAd: SafeStyle;
  public landscapeAmount = '2'
    public portraitAmount = '1'
  existingComicId: string;
  creating: boolean;
  constructor(
    private sanitizer: DomSanitizer,
    private publicityService: PostPublicityService,
    private router: Router,
    private creationService: CreationService,
    private principal: Principal,
    private activatedRouter: ActivatedRoute,
    private firebaseService: FirebaseService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.land1 = `url("assets/images/ads/dummy.jpg")`
    this.land2 = `url("assets/images/ads/dummy.jpg")`
    this.ads = `url("assets/images/ads/dummy2.jpg")`
    this.user = new User();
this.principal.identity().then(
  account=>{
    this.user = account;
    this.activatedRouter.queryParams.subscribe(
      params=>{
        this.existingComicId = params['comicId'];
      }
    )

    if(this.existingComicId){
      this.getExistingComicDetails()
    }
  }
)

    this.comicDetails = new IComicDetails();
    this.coverPhoto = "http://insiderguides.com.au/wp-content/mp/image-cache/site/2/Alone.2f23bcafcb31278fc8e952c569915fa0.jpeg";
    setInterval(() => {
      // this.imgAd = this.sanitizer.bypassSecurityTrustStyle('./assets/wallpaper/cards/png/' + Number(this.getRandomArbitrary(1, 27)).toFixed(0) + '.png');
      if (this.router.url === '/creations/comic-form') {
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


 

  }
  getExistingComicDetails() {
    this.creationService.getSpecifiedComic(this.existingComicId).subscribe(
      res=>{
        this.comicDetails = res.body
        this.coverPhoto = this.comicDetails.coverPhoto
        // alert(this.comicDetails)
      },err=>{
        //console.log("error in getting existing comic details")
      }
    )
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }


  onSelectFile(event) {
    //console.log("UPLAODDDDD")
    //console.log("event : " + JSON.stringify(event.target.files[0]))
    this.files = [];
    this.urls = [];

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
          this.coverPhoto = this.urls[0];


        }

        reader.readAsDataURL(event.target.files[i]);

      }
    }


  }

  uploadTOFirebase() {

    //console.log("Filessss" + this.files)
    return new Promise((resolve,reject)=>{
      this.firebaseService.uploadAnyImageToFirebase(this.files,'comicCovers').then(
        (res:string[])=>{
            this.comicDetails.coverPhoto = res[0];
            //console.log("phootoo"+this.comicDetails.coverPhoto)
            resolve(this.comicDetails.coverPhoto)
        },err=>{
          //console.log("error to upload firebase")
          reject(err)
        }
      )
    })

  }

  getAllAdevrtisements() {
    return new Promise((resolve, reject) => {
        this.publicityService.getAdvertisements(this.landscapeAmount, this.portraitAmount).subscribe(
            res => {
              console.log(JSON.stringify(res.body))
                resolve(res.body)
            }, err => {
                reject(err)
            }
        )
    })
}


  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }


  createComicBook() {
    this.creating=true
   // this.uploadTOFirebase();
   if(this.files.length!=0){
    this.uploadTOFirebase().then(
      res=>{
        this.comicDetails.visible = this.selected;

        this.comicDetails.createDate = new Date() != null ? moment(new Date(), DATE_TIME_FORMAT) : null;
        this.comicDetails.postOwnerId = this.user.id;


           //console.log(JSON.stringify(this.comicDetails))
          this.creationService.createComics(this.comicDetails).subscribe(
            res=>{
              if(res.body){
                this.openSnackBar('Comic book successfully saved','OK')
                this.creating=false
              }
              //console.log("Successfully created the comic"+JSON.stringify(res.body));
              this.router.navigate(['creations/comics']);
            },err=>{
              //console.log("Error in creatng comic book"+JSON.stringify(err));
              this.router.navigate(['creations/comics']);
            }
          )
      },err=>{
        //console.log("error in uploading when saving"+JSON.stringify(err))
      }
    )
   }else{
    this.comicDetails.visible = this.selected;
    this.comicDetails.postOwnerId = this.user.id
    this.creationService.createComics(this.comicDetails).subscribe(
      res=>{
        if(res.body){
          this.openSnackBar('Comic book successfully saved','OK')
        }
        //console.log("Successfully created the comic"+JSON.stringify(res.body));
        this.router.navigate(['creations/comics']);
      },err=>{
        //console.log("Error in creatng comic book"+JSON.stringify(err));
        this.router.navigate(['creations/comics']);
      }
    )
   }
    



  }

  goBack() {
    this.router.navigate(['/creations/comics'])
  }


}
