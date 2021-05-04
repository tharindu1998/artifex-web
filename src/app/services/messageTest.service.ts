import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ICreator, Creator } from 'app/shared/model/userProfile/creator.model';

@Injectable({
  providedIn: 'root'
})
export class MessageTestService {

  constructor() { }

  private subject = new Subject<any>();


    private notificationeSource = new Subject<{ topic: string, message?: any }>();
    private notificationSourceForCreator = new Subject<{topic: string, message?:Creator}>();
    notificationAnnounced$ = this.notificationeSource.asObservable();
    notificationAnnouncedAsCreator$ = this.notificationSourceForCreator.asObservable();

    public pushNotification(topic: string, message?: any) { 
        
      this.notificationeSource.next(  { topic : topic , message: message}  )   
              
    }


    public pushNotificationAsCreator(topic: string,message?: any){
      this.notificationSourceForCreator.next({topic: topic, message: message})
    }




}
