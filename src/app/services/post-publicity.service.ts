import { Injectable } from '@angular/core';
import { Likes } from 'app/shared/model/userProfile/likes.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { PostComment, IPostComment } from 'app/shared/model/userProfile/comment.model';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { IFullCommentDetails } from 'app/shared/model/userProfile/FullCommentDetails.model';
import { SharePost } from 'app/shared/model/userProfile/share.model';
import { environment } from 'environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PostPublicityService {
  public resourceUrlForLikes = environment.services_prefix + 'post/api/put-like'
  public resourceUrlForComments = environment.services_prefix + 'post/api/put-comments';
  public resourceUrlForGettingComments = environment.services_prefix + 'post/api/get-post-comments';
  public getResourcesDetails = environment.services_prefix + 'userprofile/api/user-profile-pictures-artden';
  public shareResourceUrl = environment.services_prefix + 'post/api/post-shares';
  public shareDeleteResourceUrl =environment.services_prefix +  'post/api/delete-shares-from-log';
  public deleteNovelPostURL = environment.services_prefix + 'post/api/delete-novel-from-logs';
  public deleteOriginalNovelUrl = environment.services_prefix + 'novelcomics/api/novels';
  public getPublicityCountForWritingsUrl = environment.services_prefix + 'post/api/novel-comics-like'
  public createAdvertisementUrl =environment.services_prefix +  'advertistment/api/create-advertistmets';
  public deleteCommentUrl= environment.services_prefix + 'post/api/comments';
  public getAdvertisementsUrl = environment.services_prefix + 'advertistment/api/get-random-advertistment';
  public getAdvertisementSummaryUrl = environment.services_prefix + 'advertistment/api/get-all-advertistment'
  public saveAdvertisementUrl =environment.services_prefix +  'advertistment/api/add-payments';
  constructor(
    private http: HttpClient
  ) { }


  generateLike(likeDetails: Likes): Observable<HttpResponse<Number>> {
    return this.http.post<Number>(this.resourceUrlForLikes, likeDetails, { observe: 'response' });
  }



  generateComment(commentDetails: IPostComment): Observable<HttpResponse<any>> {
    const copy = this.convertDateFromClient(commentDetails);
    return this.http
      .post<IPostComment>(this.resourceUrlForComments, copy, { observe: 'response' })
      .pipe(map((res: HttpResponse<IPostComment>) => this.convertDateFromServer(res)));
  }

  generateEditCommit(commentDetails: IPostComment) : Observable<HttpResponse<any>> {
    return this.http.post<any>(this.resourceUrlForComments,commentDetails,{observe:'response'})
  }

  deleteComment(commentId:IPostComment) : Observable<HttpResponse<any>> {
    return this.http.delete(`${this.deleteCommentUrl}/${commentId}`,{observe: 'response'})
  }

  protected convertDateFromClient(commentDetails: IPostComment): IPostComment {
    const copy: IPostComment = Object.assign({}, commentDetails, {
      createDate:
        commentDetails.commentDateTime != null && commentDetails.commentDateTime.isValid()
          ? commentDetails.commentDateTime.toJSON()
          : null
    });
    return copy;
  }


  protected convertDateFromServer(res: HttpResponse<IPostComment>): HttpResponse<IPostComment> {
    if (res.body) {
      res.body.commentDateTime = res.body.commentDateTime != null ? moment(res.body.commentDateTime) : null;
    }
    return res;
  }


  getAllComments(id: string,next?): Observable<HttpResponse<IFullCommentDetails>> {
    let page = 0;
    return this.http.get<IFullCommentDetails>(`${this.resourceUrlForGettingComments}/${id}`, {
      
      params: {
        page: next ? next : 0,
        size: '5'
      }
      , observe: 'response' });
  }


  getUsersOfComments(ids): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.getResourcesDetails}/${ids}`, { observe: 'response' });
  }


  getPublicityCountForCreation(id: string, creationId: string) :Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.getPublicityCountForWritingsUrl}/${id}/${creationId}`,{observe: 'response'})
  }


  sharePost(sharingPost: SharePost): Observable<HttpResponse<any>> {
    return this.http.post(this.shareResourceUrl, sharingPost, { observe: 'response' })
  }

  deleteSharedPost(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.shareDeleteResourceUrl}/${id}`, { observe: 'response' });
  }

  deleteNovelPost(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.deleteNovelPostURL}/${id}`, {observe: 'response'})
  }

  deleteOriginalNovel(id : string) : Observable<HttpResponse<any>> {
    return this.http.delete(`${this.deleteOriginalNovelUrl}/${id}`, {observe: 'response'})
  }




  // Advetisement REST calls

  createAdvertisement(advertisement):Observable<HttpResponse<any>>{
    return this.http.post<any>(this.createAdvertisementUrl,advertisement,{observe: 'response'})
  }

  getAdvertisements(landscape, portrait):Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.getAdvertisementsUrl}/${landscape}/${portrait}`,{observe:'response'})
  }

  getAdvertisementSummary(id:string):Observable<HttpResponse<any[]>> {
    return this.http.get<any>(`${this.getAdvertisementSummaryUrl}/${id}`,{observe:'response'})
  }

  saveAdvertisement(adDetails):Observable<HttpResponse<any>> {
    return this.http.post<any>(this.saveAdvertisementUrl,adDetails,{observe: 'response'})
  }
}
