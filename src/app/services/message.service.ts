import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ICreator } from 'app/shared/model/userProfile/creator.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  private subject = new Subject<any>();

  






    private notificationeSource = new Subject<{ topic: string, message: any }>();

    notificationAnnounced$ = this.notificationeSource.asObservable();
    public pushNotification(topic: string, message: any) { 
        
      this.notificationeSource.next(  { topic : topic , message: message}  )   
              
    }




}
