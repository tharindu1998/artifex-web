import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IUserProfilePicture } from 'app/shared/model/userProfile/user-profile-picture.model';


type EntityResponseType = HttpResponse<IUserProfilePicture>;

@Injectable({
  providedIn: 'root'
})



export class LayoutService {

  public resourceUrl = 'userprofile/api/user-profile-pictures';

  constructor(private http: HttpClient) { }


  getMainProfilePicture(): Observable<any> {

    return this.http.get('userprofile/api/main-user-profile-pictures');

  }


  getAllPictures(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IUserProfilePicture>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
    }
    return res;
}

}
