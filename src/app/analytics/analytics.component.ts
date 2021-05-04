
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { AnalyticsService } from './analytics.service';
import { Principal, User } from 'app/core';
import { PostPublicityService } from 'app/services/post-publicity.service';
import { IAdvertisement, Advertisement } from 'app/shared/model/advertisement/ad.model';
import { NgSwitchCase } from '@angular/common';
import { ProfileService } from 'app/main/boards/profile/profile.service';
import { ICreator } from 'app/shared/model/userProfile/creator.model';

import { Payment, IPayment } from 'app/shared/model/advertisement/payment.model';


import { MatDialog } from '@angular/material';
import { TooltipContentComponent } from 'app/tooltip-content/tooltip-content.component';
import { DATE_TIME_FORMAT } from 'app/shared';
import * as moment from 'moment';
declare var payhere: any;

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AnalyticsComponent implements OnInit {
  widgets: any;
  widget1SelectedYear = '2021';
  widget5SelectedDay = 'today';
  data= new Map<String , any[]>();
  dataSet: any=[];
  newDataSet = [];
  x :boolean
  months:string[] = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  advertisementDetails: Advertisement[] = [];
  value2021 : any;
  selectedAdvertisement:Advertisement
  user = new User();
  keys: string[]=[];
  userDetails: ICreator
  originalDataSet: any[]=[];
  max: number;
  maximum: number;
  paymentDetails: IPayment
  constructor(
    private profileService: ProfileService,
    private publicityService: PostPublicityService,
    private _analyticsService: AnalyticsService,
    private principal: Principal,
    private postPublicityDetails: PostPublicityService,
    private dialog: MatDialog
  ) {
    this._registerCustomChartJSPlugin();
   
  }

  ngOnInit(): void {
    this.widgets = this._analyticsService.widgets;
    this.paymentDetails = new Payment();
    this.principal.identity().then(account => {
      this.user = account;
      this.getAllAnalytics()
      this.getAllAdvertisementSummary()
      
    });

    payhere.onCompleted=(orderId)=>{
      console.log('Order id is '+orderId)
      this.savePaymentDetails(orderId)
    }

    payhere.onDismissed = function onDismissed() {
      console.log('Payment dismissed');
    };

    payhere.onError = function onError(error) {
      console.log('Error:' + error);
    };


  }


  checkEmailDialogBox(){
    const dialogRef = this.dialog.open(TooltipContentComponent,
      {
        width: '800px',
        height: '500px'
      }
      )
  }

  savePaymentDetails(orderId){
   this.paymentDetails.advertistmentId = orderId
   this.paymentDetails.amount = this.selectedAdvertisement.amount
   this.paymentDetails.paidBy = this.user.id;
   this.paymentDetails.paidDate = new Date() !==null? moment(new Date(),DATE_TIME_FORMAT):null;
   this.paymentDetails.paidPersonEmail = this.user.email

   this.postPublicityDetails.saveAdvertisement(this.paymentDetails).subscribe(
     res=>{
      //  alert("Check email")
      //  console.log("payment successfull "+JSON.stringify(res))
       this.checkEmailDialogBox()
     },err=>{
       console.log("Payment not saved "+JSON.stringify(err))
     }
   )
  }

  getAllAnalytics() {

    this._analyticsService.getAllAnalyticsdata(this.user.id).then(res => {

    //  alert("data set" + JSON.stringify(res.body));
      this.data = res.body;
      this.dataSet = this.data['2021'].data;
      let max = 0;
      let counter = 0;
      
Object.keys(this.data).forEach(element => {
    this.keys.push(element)
});


      // this.dataSet.forEach(element => {
      //   if (element > max) {
      //     max = element;
      //     this.maximum = max
      //     // alert('maxaaa = '+this.maximum)
      //   }
      // });

      this.dataSet.forEach(element => {
       
          max = max + element;
          this.maximum = max
          // alert('maxaaa = '+this.maximum)
        
      });

      this.dataSet.forEach(element => {
        // this.originalDataSet[counter] = element
        this.newDataSet[counter] = (element / max) * 5;
        
        counter++;
      }); 

      this.data['2021'].data = this.newDataSet;

      let temp = new Map<String , any[]>();
      let datas = [{

        
          label: 'Posts',
          data : this.data['2021'].data,
          fill : 'start',
        
      }];

      temp['2021'] = datas;
      this.value2021 = temp



      //;

      this.x = true

      



      // //console.log(JSON.stringify(temp));



      //  alert(JSON.stringify(res.body))

    }, err => {

      // alert("cannot get analitics" + JSON.stringify(err))
    })
  }


  private _registerCustomChartJSPlugin(): void {
    // let maxa  = this.maximum;
    // alert(this.maximum);
    this.dataSet.forEach(element => {
      // alert(element)
    });


    (<any>window).Chart.plugins.register({
      afterDatasetsDraw: function (chart, easing): any {
        // Only activate the plugin if it's made available

        
        // in the options
        if (
          !chart.options.plugins.xLabelsOnTop ||
          (chart.options.plugins.xLabelsOnTop && chart.options.plugins.xLabelsOnTop.active === false)
        ) {
          return;
        }

        // To only draw at the end of animation, check for easing === 1
        const ctx = chart.ctx;
      


        chart.data.datasets.forEach(function (dataset, i): any {
          
          const meta = chart.getDatasetMeta(i);
          // alert(JSON.stringify(meta))
          // //console.log("meta"+JSON.stringify(meta))
          if (!meta.hidden) {
            meta.data.forEach(function (element, index): any {
              // //console.log("meta" + element)
              // Draw the text in black, with the specified font
              ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
              const fontSize = 13;
              const fontStyle = 'normal';
              const fontFamily = 'Roboto, Helvetica Neue, Arial';
              ctx.font = (<any>window).Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

              // Just naively convert to string for now
              // this.originalDataSet.forEach(element => {
              //   console.log(element)
              // });
              
              // const dataString = dataset.data[index].toString() + 'k';

              // Make sure alignment settings are correct
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              const padding = 15;
              const startY = 24;
              const position = element.tooltipPosition();
              // ctx.fillText(dataString, position.x, startY);

              ctx.save();

              ctx.beginPath();
              ctx.setLineDash([5, 3]);
              ctx.moveTo(position.x, startY + padding);
              ctx.lineTo(position.x, position.y - padding);
              ctx.strokeStyle = 'rgba(255,255,255,0.12)';
              ctx.stroke();
              
              ctx.restore();
            });
          }
        });
      }
    });
  }




  getAllAdvertisementSummary(){
    // alert(this.user.id)
    this.publicityService.getAdvertisementSummary(this.user.id).subscribe(
      res=>{
        this.advertisementDetails=res.body
        // alert("Advertisement :"+JSON.stringify(this.advertisementDetails))
      },err=>{
        //console.log(JSON.stringify(err))
      }
    )
  }



  // payNow(advertisement:Advertisement) {
  
  //   const payment = {
  //     sandbox: true,
  //     merchant_id: '1211743',       // Replace your Merchant ID
  //     return_url: 'http://sample.com/return',
  //     cancel_url: 'http://sample.com/cancel',
  //     notify_url: 'http://sample.com/notify/'+advertisement.id,
  //     order_id: advertisement.id,
  //     items: 'Ad Campagin for ' +advertisement.displayDuration + ' days' ,
  //     amount: advertisement.amount,
  //     currency: 'USD',
  //     first_name: 'Saman',
  //     last_name: 'Perera',
  //     email: 'samanp@gmail.com',
  //     phone: '0771234567',
  //     address: 'No.1, Galle Road',
  //     city: 'Colombo',
  //     country: 'Sri Lanka',
  //     // delivery_address: 'No. 46, Galle road, Kalutara South',
  //     // delivery_city: 'Kalutara',
  //     // delivery_country: 'Sri Lanka',
  //     custom_1: '',
  //     custom_2: ''
  //   };
 
  //     payhere.startPayment(payment);
    
    

  // }


  payNow(advertisement:Advertisement) {
    this.selectedAdvertisement = advertisement
    const payment = {
      sandbox: true,
      merchant_id: '1211743',       // Replace your Merchant ID
      return_url: 'http://sample.com/return',
      cancel_url: 'http://sample.com/cancel',
      notify_url: 'http://sample.com/notify/'+advertisement.id,
      order_id: advertisement.id,
      items: 'Ad Campagin for ' +advertisement.displayDuration + ' days' ,
      amount: advertisement.amount,
      currency: 'USD',
      // adOwnerId: advertisement.addOwnerId,
      first_name: advertisement.addOwnerId,
      last_name: 'Perera',
      email: this.user.email,
      phone: '0771234567',
      address: 'No.1, Galle Road',
      city: 'Colombo',
      country: 'Sri Lanka',
      delivery_address: 'No. 46, Galle road, Kalutara South',
      delivery_city: 'Kalutara',
      delivery_country: 'Sri Lanka',
      // custom_1: '',
      // custom_2: ''
    };
 
      payhere.startPayment(payment);
    
    

  }


  // getAddOwnerDetails(id){

  //   return new Promise ((resolve,reject)=>{
  //     this.profileService.getDetails(id).subscribe(
  //       res=>{

  //       }
  //     )
  //   })
  //   this.profileService.getDetails(id).subscribe(
  //     (res)=>{
  //       this.userDetails = res.body;
  //       console
  //     }
  //   )
  // }


}


