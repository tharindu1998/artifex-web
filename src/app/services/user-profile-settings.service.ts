import { Injectable } from '@angular/core';
import { IUserProfile } from 'app/shared/model/userProfile/user-profile.model';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserProfileSettingsService {
  public resourceUrl = environment.services_prefix +'userprofile/api/user-profiles'
  constructor(
    private http: HttpClient
  ) { }

  setProfileDetails(userProfileDetails: IUserProfile) : Observable<HttpResponse<any>> {
    return this.http.put<any>(this.resourceUrl,userProfileDetails,{observe: 'response'});
  }

  getProfileDetails(id :string):Observable<HttpResponse<any>>{
    return this.http.get<any>(`${this.resourceUrl}/${id}`,{observe:'response'});
  }


  

}
