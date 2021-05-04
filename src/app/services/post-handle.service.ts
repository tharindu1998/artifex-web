import { Injectable } from '@angular/core';

import { IImagePost, ImagePost } from 'app/shared/model/userProfile/image.post';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { User, IUser, Principal } from 'app/core';
import { IPostDetails } from 'app/shared/model/userProfile/PostDetails.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagePostUploadService {
  public resourceUrl = environment.services_prefix + 'post/api/image-posts1';
  public resourceURLDetails = environment.services_prefix + 'post/api/log-artden';
  public newResourceURLDetails = environment.services_prefix + 'post/api/log-profile';

  public getResourcesDetails = environment.services_prefix + 'userprofile/api/user-profile-pictures-artden'
  user: IUser;
  public urlToGetAllUploadedImages = environment.services_prefix + 'post/api/one-by-one-image-posts';
  public getAllPicsUrl = environment.services_prefix + 'post/api/image-All-posts';
  public deleteOnePost = environment.services_prefix + 'post/api/delete-image-posts-set';
  public deleteOneImage = environment.services_prefix + 'post/api/delete-one-image-posts';
  public gettingCreationLog = environment.services_prefix + 'novelcomics/api/profile-novels';
  public getOthersProfileDetailsURL = '';
  public getNewPostsNMethodArtdenUrl = 'post/api/log-artifex';
  public getOthersPicturesUrl='post/api/view-others-image-posts'
  public createReportPostUrl='postreports/api/add-report-posts';

  constructor(
    private http: HttpClient,
    private principal: Principal
  ) { }




  create(imagePosts: IImagePost): Observable<HttpResponse<IImagePost>> {
    const copy = this.convertDateFromClient(imagePosts);
    return this.http
      .post<IImagePost>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: HttpResponse<IImagePost>) => this.convertDateFromServer(res)));
  }

  protected convertDateFromClient(imagePosts: IImagePost): IImagePost {
    const copy: IImagePost = Object.assign({}, imagePosts, {
      createDate:
        imagePosts.createDate != null && imagePosts.createDate.isValid()
          ? imagePosts.createDate.toJSON()
          : null
    });
    return copy;
  }


  protected convertDateFromServer(res: HttpResponse<IImagePost>): HttpResponse<IImagePost> {
    if (res.body) {
      res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
    }
    return res;
  }


  getPosts(id: string): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(`${this.resourceURLDetails}/${id}`, { observe: 'response' });
  }

  getNewPosts(id: string): Observable<HttpResponse<IPostDetails>> {
    return this.http.get<IPostDetails>(`${this.resourceURLDetails}/${id}`, { observe: 'response' });
  }

  getNewPostsNMethod(id: string, next?): Observable<HttpResponse<IPostDetails>> {
    return this.http.get<IPostDetails>(`${this.newResourceURLDetails}/${id}`, {
      params: {
        page: next ? next : 0,
        size: '5'
      },

      observe: 'response'
    });
  }

  viewOtherProfile(id, friendState, myId, next?) {
    return this.http.get<any>(`${this.newResourceURLDetails}/${id}/${friendState}/${myId}`, {
      params: {
        page: next ? next : 0,
        size: '5'
      }, 
      
      observe: 'response' });
  }


  getPostUsersDetails(ids): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.getResourcesDetails}/${ids}`, { observe: 'response' });
  }

  getTimelinePicsOneByOne(id: string): Observable<HttpResponse<IImagePost>> {
    return this.http.get<IImagePost>(`${this.urlToGetAllUploadedImages}/${id}`, { observe: 'response' });
  }

  getAllPictures(id: string, type, next?): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(`${this.getAllPicsUrl}/${id}/${type}`, {
      params: {
        page: next ? next : 0,
        size: '5'
      },

      observe: 'response'
    });
  }

  getOthersPictures(id: string, friendState, next?): Observable<HttpResponse<any>> {
    return this.http.get<any[]>(`${this.getOthersPicturesUrl}/${id}/${friendState}`, {
      params: {
        page: next ? next : 0,
        size: '5'
      },

      observe: 'response'
    })
  }

  getAllCreationThumbsOfLog(idArray): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.gettingCreationLog, idArray, { observe: 'response' })
  }

  getOthersProfileDetails(friendId: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.getOthersProfileDetailsURL}/${friendId}`, { observe: 'response' })
  }

  deleteSingleImage(id: string, type: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.deleteOnePost}/${id}/${type}`, { observe: 'response' });
  }

  deleteOneImageOfAPost(id: string, type: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.deleteOneImage}/${id}/${type}`, { observe: 'response' })
  }



  getNewPostsNMethodArtden(id: string, FriendsIds, next?): Observable<HttpResponse<any>> {
    // getNewPostsNMethodArtden(id: string) : Observable<HttpResponse<any>> {
    return this.http.get<IPostDetails>(`${this.getNewPostsNMethodArtdenUrl}/${id}/${FriendsIds}`, {
      params: {
        page: next ? next : 0,
        size: '5'
      },

      observe: 'response'
    });
    // return this.http.get<IPostDetails>(`${this.getNewPostsNMethodArtdenUrl}/${id}`, { observe: 'response' });

  }

  createReportPost(reportingPost):Observable<HttpResponse<any>>{
    return this.http.post<any>(this.createReportPostUrl,reportingPost,{observe:'response'})
  }
 








}
