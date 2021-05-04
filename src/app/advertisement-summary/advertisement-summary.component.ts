import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TooltipContentComponent } from 'app/tooltip-content/tooltip-content.component';
import { IPayment, Payment } from 'app/shared/model/advertisement/payment.model';
import { Principal, IUser, User } from 'app/core';
import { Advertisement } from 'app/shared/model/advertisement/ad.model';
import { PostPublicityService } from 'app/services/post-publicity.service';
import { DATE_TIME_FORMAT } from 'app/shared';
import * as moment from 'moment';
declare var payhere: any;
@Component({
  selector: 'app-advertisement-summary',
  templateUrl: './advertisement-summary.component.html',
  styleUrls: ['./advertisement-summary.component.scss']
})
export class AdvertisementSummaryComponent implements OnInit {
  paymentDetails: IPayment
  user:IUser
  selectedAdvertisement:Advertisement
  advertisementDetails: Advertisement[] = [];
  constructor(
    private dialog: MatDialog,
    private principal: Principal,
    private postPublicityDetails: PostPublicityService,
  ) { }

  ngOnInit() {
    this.paymentDetails = new Payment();
    this.user = new User()
    this.principal.identity().then(account => {
      this.user = account;
  
      this.getAllAdvertisementSummary();
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
        height: '450px'
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

  getAllAdvertisementSummary(){
    // alert(this.user.id)
    this.postPublicityDetails.getAdvertisementSummary(this.user.id).subscribe(
      res=>{
        this.advertisementDetails=res.body
        // alert("Advertisement :"+JSON.stringify(this.advertisementDetails))
      },err=>{
        //console.log(JSON.stringify(err))
      }
    )
  }


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

}
