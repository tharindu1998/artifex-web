import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAlbumImage, AlbumImage } from 'app/shared/model/userProfile/albumImage.model';
import { FirebaseService } from 'app/services/firebase.service';
import { IAlbumPost, AlbumPost } from 'app/shared/model/userProfile/album.model';
import { Principal, IUser, User } from 'app/core';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared';
import { AlbumService } from 'app/services/album.service';
import { Visibility } from 'app/shared/model/userProfile/visibility.model';

@Component({
  selector: 'app-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.scss'],
  animations: fuseAnimations
})
export class AlbumFormComponent implements OnInit {
  selected= Visibility.PUBLIC;
  horizontalStepperStep2:false;
  horizontalStepperStep1: true;
  description: string;
  nameOfTheAlbum: string;
  user: IUser;
  matController: boolean;
  albumPost: IAlbumPost;
  index: any;
  form: FormGroup;
  albumImage: IAlbumImage;
  BasicDetails: FormGroup;
  addMedia: FormGroup;
  files: File[] = [];
  eve: EventTarget;
  urls = [];
  inputTexts: string[] = [];
  creating: boolean;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private principal: Principal,
    private albumService: AlbumService
  ) { }

  ngOnInit() {
    this.user = new User();

    this.principal.identity().then(
      account => {
        this.user = account;
      }
    )
    this.matController = true;
    this.albumPost = new AlbumPost();
    this.albumImage = new AlbumImage();


    this.BasicDetails = this.formBuilder.group({
      nameOfTheAlbum: ['', Validators.required],
      description: ['', Validators.required]
    });

    

  


    // this.addMedia = this.formBuilder.group({
    //   address: ['',Validators.required]
    // });

    // //console.log(
    //   this.inputTexts
    // )

  }

  // show(){
  //   this.albumImage.imageUrl = this.urls;
  //   this.albumImage.description = this.inputTexts;
  // }

  onSelectFile(event) {
    // this.files = [];

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      this.eve = event.target.files;

      for (let i = 0; i < filesAmount; i++) {

        var reader: any,
          target: EventTarget;
        reader = new FileReader();
        this.files.push(event.target.files.item(i));

        reader.onload = (event) => {
          // //console.log(event.target.result);
          this.urls.push(event.target.result);

        }

        reader.readAsDataURL(event.target.files[i]);

      }
    }


  }


  uploadToFirebase() {
    this.creating = true;
    this.firebaseService.uploadAlbumImagesToFirebase(this.files).then(
      (res: string[]) => {

        this.albumPost.imageUrls = res;
        this.saveAlbumImages();
        //console.log("firebase uplaoded album")
        // this.albumImage.imageUrl = res;
        // this.albumImage.description = this.inputTexts;
        // //console.log(this.albumImage);
      },
      (err) => {
        //console.log(JSON.stringify(err));
        this.matController = false;
      }
    )
  }

  saveAlbumImages() {
    this.albumPost.postOwnerId = this.user.id;
    this.albumPost.createDateTime = new Date() != null ? moment(new Date(), DATE_TIME_FORMAT) : null;
    this.albumPost.type = "ALBUM";
    this.albumPost.message =  this.BasicDetails.get('description').value;
    this.albumPost.messages = this.inputTexts;
    this.albumPost.albumName = this.BasicDetails.get('nameOfTheAlbum').value;
    this.albumPost.visible = this.selected;
    // alert(JSON.stringify(this.albumPost));

    this.albumService.createAlbum(this.albumPost).subscribe(
      res => {
        this.matController = false;
        this.creating = false;
        //console.log("ALBUM CREATED" + JSON.stringify(res));
      },
      err => {
        this.matController = false;
        this.creating = false;
        //console.log("error in saving album" + JSON.stringify(err));
      }
    )

  }




  goBack() {
    this.router.navigate(['/boards/profile']);
  }
}
