import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserProfilePicture } from 'app/shared/model/userProfile/user-profile-picture.model';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { createRequestOption } from 'app/shared';
import { ICreator } from 'app/shared/model/userProfile/creator.model';
import { environment } from 'environments/environment';


type EntityResponseType = HttpResponse<IUserProfilePicture>;
type EntityArrayResponseType = HttpResponse<IUserProfilePicture[]>;

@Injectable()
export class ProfileService  
{
    timeline: any;
    about: any;
    photosVideos: any;

    timelineOnChanged: BehaviorSubject<any>;
    aboutOnChanged: BehaviorSubject<any>;
    photosVideosOnChanged: BehaviorSubject<any>;

    public resourceUrl = environment.services_prefix + 'userprofile/api/main-user-profile-pictures';
    public resourceUrlCommon = environment.services_prefix + 'userprofile/api/user-profile-pictures';
    public resourceSearchUrl = environment.services_prefix + 'userprofile/api/_search/user-profile-pictures';
    public resourceURLCatgorizedPhotos = environment.services_prefix + 'userprofile/api/user-profile-pictures1';
    public resourceURLDetails = environment.services_prefix + 'userprofile/api/complete-user-profile';
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,

    ) {
        // Set the defaults
        this.timelineOnChanged = new BehaviorSubject({});
        this.aboutOnChanged = new BehaviorSubject({});
        this.photosVideosOnChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     // tslint:disable-next-line:no-redundant-jsdoc
     // tslint:disable-next-line:no-redundant-jsdoc
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */

    create(userProfilePicture: IUserProfilePicture): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(userProfilePicture);
        return this._httpClient
            .post<IUserProfilePicture>(this.resourceUrlCommon, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(userProfilePicture: IUserProfilePicture): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(userProfilePicture);
        return this._httpClient
            .put<IUserProfilePicture>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    getDetails(id: string): Observable<HttpResponse<ICreator>> {
        return this._httpClient.get<ICreator>(`${this.resourceURLDetails}/${id}`, { observe: 'response' });
    }



    getCategorizedPictures(id: string): Observable<any> {
        return this._httpClient
            .get<any>(`${this.resourceURLCatgorizedPhotos}/${id}`, { observe: 'response' });
        //   .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }
    getAllPictures(id: string): Observable<EntityArrayResponseType> {
        return this._httpClient
            .get<IUserProfilePicture[]>(`${this.resourceUrlCommon}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    getProfilePicture(id: string): Observable<EntityResponseType> {
        return this._httpClient
            .get<IUserProfilePicture>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this._httpClient
            .get<IUserProfilePicture[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this._httpClient.delete<any>(`${this.resourceUrlCommon}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this._httpClient
            .get<IUserProfilePicture[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(userProfilePicture: IUserProfilePicture): IUserProfilePicture {
        const copy: IUserProfilePicture = Object.assign({}, userProfilePicture, {
            createDate:
                userProfilePicture.createDate != null && userProfilePicture.createDate.isValid()
                    ? userProfilePicture.createDate.toJSON()
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((userProfilePicture: IUserProfilePicture) => {
                userProfilePicture.createDate = userProfilePicture.createDate != null ? moment(userProfilePicture.createDate) : null;
            });
        }
        return res;
    }

    // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    //     return new Promise((resolve, reject) => {
    //         Promise.all([
    //             this.getTimeline(),
    //             this.getAbout(),
    //             this.getPhotosVideos()
    //         ]).then(
    //             () => {
    //                 resolve();
    //             },
    //             reject
    //         );
    //     });
    // }

    /**
     * Get timeline
     */
    getTimeline(): Promise<any[]> {
        return new Promise((resolve, reject) => {

            this._httpClient.get(environment.services_prefix + 'api/profile-timeline')
                .subscribe((timeline: any) => {
                    this.timeline = timeline;
                    this.timelineOnChanged.next(this.timeline);
                    resolve(this.timeline);
                }, reject);
        });
    }

    /**
     * Get about
     */
    getAbout(): Promise<any[]> {
        return new Promise((resolve, reject) => {

            this._httpClient.get(environment.services_prefix + 'api/profile-about')
                .subscribe((about: any) => {
                    this.about = about;
                    this.aboutOnChanged.next(this.about);
                    resolve(this.about);
                }, reject);
        });
    }

    /**
     * Get photos & videos
     */
    getPhotosVideos(): Promise<any[]> {
        return new Promise((resolve, reject) => {

            this._httpClient.get(environment.services_prefix + 'api/profile-photos-videos')
                .subscribe((photosVideos: any) => {
                    this.photosVideos = photosVideos;
                    this.photosVideosOnChanged.next(this.photosVideos);
                    resolve(this.photosVideos);
                }, reject);
        });
    }

    getUser(): Observable<any> {
        return this._httpClient.get(environment.services_prefix + '/uaa/api/account');
    }

    /*
        create(userProfilePicture: IUserProfilePicture): Observable<EntityResponseType> {
            const copy = this.convertDateFromClient(userProfilePicture);
            return this.http
                .post<IUserProfilePicture>(this.resourceUrl, copy, { observe: 'response' })
                .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
        }
    
        update(userProfilePicture: IUserProfilePicture): Observable<EntityResponseType> {
            const copy = this.convertDateFromClient(userProfilePicture);
            return this.http
                .put<IUserProfilePicture>(this.resourceUrl, copy, { observe: 'response' })
                .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
        }*/

}
