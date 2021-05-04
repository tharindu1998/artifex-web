import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { BehaviorSubject, Subject, Observable } from 'rxjs'
import { HttpResponse, HttpClient } from '@angular/common/http';
import { IFCMToken } from 'app/shared/model/chats/fcmtoken.model';
import { environment } from 'environments/environment';

@Injectable()
export class MessagingService {

  

  fcmToken: IFCMToken;

  public resourceUrl = environment.services_prefix +'messages/api/save-fcm-tokens';
  currentMessage = new Subject<{ topic: string, message?: any }>();

 datas = this.currentMessage.asObservable();

  constructor(
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging,
    private http : HttpClient
    ) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }


  updateToken(userId, token) {
    // we can change this function to request our backend service
    this.angularFireAuth.authState.pipe(take(1)).subscribe(
      () => {
        const data = {};
        data[userId] = token
        this.saveToken(userId,token).subscribe(res=>{
        //  alert(JSON.stringify(res))
        },
        
        err=>{
          //////console.log(JSON.stringify(err))
        })


      //  this.angularFireDB.object('fcmTokens/').update(data)
      })
  }

  /**
   * request permission for notification from firebase cloud messaging
   * 
   * @param userId userId
   */
   requestPermission(userId) {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        // alert('userToken' + token);
        this.updateToken(userId, token);
      },
      (err) => {
        // console.error('Unable to get permission to notify.', err);
      }
    );
  }


  receiveMessage() {

    this.angularFireMessaging.messages.subscribe(
      (payload) => {
    //    //////console.log("new message received.assssssssssssssssssssssssssssssssss ", payload);
        
        this.currentMessage.next({ topic : "topic" , message: payload});        
      })
  }


  saveToken(userId,token) : Observable<HttpResponse<any>>{
    return this.http.post<any>(this.resourceUrl,{"personId" : userId,"fcmToken":token},{observe: 'response'})
  }
  


}
