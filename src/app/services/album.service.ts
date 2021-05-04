import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAlbumPost } from 'app/shared/model/userProfile/album.model';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { IImagePost } from 'app/shared/model/userProfile/image.post';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  resourceUrl = environment.services_prefix + 'post/api/albums1';
  public resourceUrlTimeline = environment.services_prefix + 'post/api/one-by-one-image-posts';
  public resourceUrlAlbumThumbnails =environment.services_prefix +  'post/api/albums-thumbnails';
  public getSingleImagePostUrl = environment.services_prefix + 'post/api/one-image-posts' 
  public getAlbumPhotosAllUrl = environment.services_prefix + 'post/api/view-album-image-posts';
  public getOthersAlbumThumbnailsUrl = environment.services_prefix + 'post/api/albums-thumbnails-other';
  constructor(
    private http: HttpClient
  ) { }



  createAlbum(albumPost: any): Observable<HttpResponse<IAlbumPost>> {
    const copy = this.convertDateFromClient(albumPost);
    return this.http
      .post<IAlbumPost>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: HttpResponse<IAlbumPost>) => this.convertDateFromServer(res)));
  }



  protected convertDateFromClient(albumPost: IAlbumPost): IAlbumPost {
    const copy: IAlbumPost = Object.assign({}, albumPost, {
      createDate:
        albumPost.createDateTime != null && albumPost.createDateTime.isValid()
          ? albumPost.createDateTime.toJSON()
          : null
    });
    return copy;
  }


  protected convertDateFromServer(res: HttpResponse<IAlbumPost>): HttpResponse<IAlbumPost> {
    if (res.body) {
      res.body.createDateTime = res.body.createDateTime != null ? moment(res.body.createDateTime) : null;
    }
    return res;
  }

  getTimelinePostsPreview(id: string, requestImage: Number,type: string): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(`${this.resourceUrlTimeline}/${id}/${requestImage}/${type}`, { observe: 'response' });
  }

  

  getSinglePictures(id:string) : Observable<HttpResponse<any>>{
    return this.http.get<HttpResponse<any>>(`${this.getSingleImagePostUrl}/${id}`, {observe: 'response'});
  }

  getAlbumThumbnails(id: string): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(`${this.resourceUrlAlbumThumbnails}/${id}`, { observe: 'response' });
  }

  getAlbumPhotosAll(albumId: string){
    return this.http.get<any[]>(`${this.getAlbumPhotosAllUrl}/${albumId}`,{observe:'response'})
  }

  getOthersAlbumThumbnails(id: string, friendState, next?) {
    return this.http.get<any[]>(`${this.getOthersAlbumThumbnailsUrl}/${id}/${friendState}`,{
      params: {
        page: next ? next : 0,
        size: '8'
      },
      
      observe:'response'})
  }


}
