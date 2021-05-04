import { Component, OnInit } from '@angular/core';
import { ICreator, Creator } from 'app/shared/model/userProfile/creator.model';
import { IAdvertisement, Advertisement } from 'app/shared/model/advertisement/ad.model';
// import moment = require('moment');
import * as moment from 'moment';

import { MessageTestService } from 'app/services/messageTest.service';
import { FirebaseService } from 'app/services/firebase.service';
import { PostPublicityService } from 'app/services/post-publicity.service';
import { DATE_TIME_FORMAT } from 'app/shared';
import { AdvertisementCategory } from 'app/shared/model/advertisement/AdvertisementCategory.model';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ad-campaign',
  templateUrl: './ad-campaign.component.html',
  styleUrls: ['./ad-campaign.component.scss'],
  animations: fuseAnimations
})
export class AdCampaignComponent implements OnInit {

  horizontalStepperStep2: false;
  horizontalStepperStep1: true;
  adCreator: ICreator
  adDetails: IAdvertisement
  file: File[] = []
  expiryDate: moment.Moment;
  selectedCategory: string;
  uploading: boolean;
  waitMessage: string = '';
  constructor(
    private messageService: MessageTestService,
    private firebaseService: FirebaseService,
    private publicityService: PostPublicityService,
    private router: Router
  ) {
    this.adCreator = new Creator();
    this.adDetails = new Advertisement();

    this.messageService.notificationAnnounced$.subscribe(
      res => {
        if (res.topic === 'GET_USER_PROFILE_DATA') {
          this.adCreator = res.message

        }
      }
    )


  }

  ngOnInit() {
    this.getAdCreatorDetails();
    this.adDetails.displayDuration = 7;
    this.adDetails.adGraphic = '';
    this.checkAmount();
  }


  getAdCreatorDetails() {
    this.messageService.pushNotification('REQUEST_USER_PROFILE_DATA')
  }

  onSelectFile(event) {
    // this.files = [];

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;




      var reader: any,
        target: EventTarget;
      reader = new FileReader();
      this.file[0] = event.target.files.item(0);

      reader.onload = (event) => {
        // //console.log(event.target.result);
        this.adDetails.adGraphic = event.target.result;

      }

      reader.readAsDataURL(event.target.files[0]);


    }


  }

  uploadAdGraphicToFirebase() {
    return new Promise((resolve, reject) => {
      this.firebaseService.uploadAnyImageToFirebase(this.file, 'adGraphic').then(
        (res: string[]) => {

          this.adDetails.adGraphic = res[0];

          resolve(this.adDetails.adGraphic)

        },
        (err) => {
          //console.log(JSON.stringify(err));
          reject("error in uploading to the firebase")
          // this.matController = false;
        }
      )
    })
  }

  checkAmount() {
    // alert(this.adDetails.displayDuration)
    if (this.adDetails.displayDuration === 7) {
      this.adDetails.expireDate = moment(new Date(), DATE_TIME_FORMAT).add('days', this.adDetails.displayDuration)

      this.adDetails.amount = '2';
    } else if (this.adDetails.displayDuration === 14) {

      this.adDetails.expireDate = moment(new Date(), DATE_TIME_FORMAT).add('days', this.adDetails.displayDuration)
      this.adDetails.amount = '3.80'

    } else if (this.adDetails.displayDuration === 21) {

      this.adDetails.expireDate = moment(new Date(), DATE_TIME_FORMAT).add('days', this.adDetails.displayDuration)
      this.adDetails.amount = '5.50'

    } else {
      this.adDetails.expireDate = moment(new Date(), DATE_TIME_FORMAT).add('days', this.adDetails.displayDuration)
      this.adDetails.amount = '7.90'
    }
  }

  selectCategory(category: string) {
    if (category === '1') {
      this.adDetails.category = AdvertisementCategory.PORTRAIT
      this.selectedCategory = 'PORTRAIT'
    } else if (category === '2') {
      this.adDetails.category = AdvertisementCategory.LANDSCAPE
      this.selectedCategory = 'LANDSCAPE'
    }
  }

  createAdvertisement() {
    this.uploading = true;
    this.waitMessage = 'Please wait, have you ever wondered why earth is flat ?.....';
    this.uploadAdGraphicToFirebase().then(
      res => {
        this.adDetails.addOwnerId = this.adCreator.user.id
        this.adDetails.createdDateTime = new Date() !== null ? moment(new Date(), DATE_TIME_FORMAT) : null;

        this.publicityService.createAdvertisement(this.adDetails).subscribe(
          res => {
            this.uploading = false;
            this.router.navigateByUrl('/analytics');
            //console.log("ad created"+JSON.stringify(res.body))
          }, err => {
            //console.log("error in creating the advertisement"+JSON.stringify(err))
          }
        )
      }
    )
  }
  goBack() {
    window.history.back();
  }
}
