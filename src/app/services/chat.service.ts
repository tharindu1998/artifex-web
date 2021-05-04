import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chat } from 'app/shared/model/chats/chat.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public chatResourceUrl = environment.services_prefix + 'messages/api/chat';
  public chatPeopleResourceUrl =environment.services_prefix +  'messages/api/all-chat-users1';
  public allChatResourceUrl= environment.services_prefix + 'messages/api/all-chats';
  public samChatResourceUrl=environment.services_prefix +  'messages/api/sendFCM';
  public seeAllChats = environment.services_prefix + 'messages/api/seen-all-chats';
  public userTokenResourceUrl =environment.services_prefix +  'messages/api/get-usertoken';

  constructor(
    private http: HttpClient
  ) { }

  // getAllPeople() : Observable<HttpResponse<any>>{
  //   return this.http.get<any>('../assets/json/contacts.json',{observe:'response'})
  // }

  getAllPeople(id,next?) : Observable<HttpResponse<any>>{
    return this.http.get<any>(`${this.chatPeopleResourceUrl}/${id}`,{
      params: {
        page: next ? next : 0,
        size: '25'
      },
      observe: 'response'
    })
  }

  // getAllChat(reserverId,senderId) : Observable<HttpResponse<any[]>>{
  //   return this.http.get<any[]>(`${this.allChatResourceUrl}/${reserverId}/${senderId}`,{observe:'response'})
  // }

  getAllChat(reserverId,senderId,next?) : Observable<HttpResponse<any[]>>{

   return this.http.get<any[]>(`${this.allChatResourceUrl}/${reserverId}/${senderId}`, {
      params: {
        page: next ? next : 0,
        size: '8'
      },
      observe: 'response'
    })
  //  return this.http.get<any[]>(`${this.allChatResourceUrl}/${reserverId}/${senderId}`,{observe:'response'})
  }


  getUserToken(id) : Observable<HttpResponse<any>>{
    return this.http.get<any>(`${this.userTokenResourceUrl}/${id}`,{observe:'response'})
  }


  saveChat(chat : Chat): Observable<HttpResponse<any>>{
    return this.http.post<any>(this.chatResourceUrl,chat,{observe:'response'})
  }

  seenAllChats(reserverId,senderId): Observable<HttpResponse<any>>{
    return this.http.get<any>(`${this.seeAllChats}/${reserverId}/${senderId}`,{observe:'response'})
  }


  saveChats(): Observable<HttpResponse<any>>{
    return this.http.get<any>(this.samChatResourceUrl,{observe:'response'})
  }








}
