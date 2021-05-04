import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {

  public resourceUrl = '../../assets/json/dummyData.json';
  public createRequestUrl = environment.services_prefix + 'userprofile/api/create-friend-requests';
  public getAllRequestsUrl = environment.services_prefix + 'userprofile/api/all-friends-requests';
  public acceptFriendRequestUrl =environment.services_prefix +  'userprofile/api/add-friend';
  public getFriendStateUrl = environment.services_prefix + 'userprofile/api/check-friend';
  public deleteRequestUrl = environment.services_prefix + 'userprofile/api/cancel-friend-requests';
  public getAllFriendsArtdenUrl = environment.services_prefix + 'userprofile/api/get-all-friends';
  public unfriendRequestUrl = environment.services_prefix + 'userprofile/api/unfriend-friend-requests';
  public getAllFriendsToProfileUrl = environment.services_prefix +  'userprofile/api/all-friends';
  constructor(
    private http: HttpClient
  ) { }

  getAllRequests(id:string):Observable<any>{                                         //requestedPersonId should be sent to get all the requests related to the user
    return this.http.get<any>(`${this.getAllRequestsUrl}/${id}`,{observe: 'response'})
  }

  acceptFriendRequest(detail):Observable<any>{
    return this.http.post<any>(this.acceptFriendRequestUrl,detail,{observe:'response'})
  }

  createFriendRequest(friendRequetsDetails): Observable<any> {
    return this.http.post(this.createRequestUrl,friendRequetsDetails,{observe:'response'})
  }

  getFriendState(id: string, friendId: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.getFriendStateUrl}/${friendId}/${id}`,{observe:'response'})
  }

  deleteRequest(id: string, friendId: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.deleteRequestUrl}/${friendId}/${id}`,{observe: 'response'})
  }

  getAllFriendsArtden(id:string): Observable<HttpResponse<any>>{
    return this.http.get<any>(`${this.getAllFriendsArtdenUrl}/${id}`,{observe: 'response'})
  }

  unfriendRequest(id:string, friendId: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.unfriendRequestUrl}/${friendId}/${id}`,{observe:'response'})
  }


  getAllFriendsToProfile(id: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.getAllFriendsToProfileUrl}/${id}`,{observe: 'response'})
  }
}
