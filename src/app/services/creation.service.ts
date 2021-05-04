import { Injectable } from '@angular/core';
import { Writing } from 'app/shared/model/userProfile/writings.model';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chapter } from 'app/shared/model/creations/chapter.model';
import { WritingPage } from 'app/shared/model/creations/page.model';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})

export class CreationService {
    public writingResourceUrl = environment.services_prefix + 'novelcomics/api/createNovels';
    public writingThumbnailsResourceUrl = environment.services_prefix + 'novelcomics/api/novels-thumbnails'
    public chapterCreatingResourceUrl = environment.services_prefix + 'novelcomics/api/add-episoids';
    public chaptersGettingResourcesUrl = environment.services_prefix + 'novelcomics/api/get-all-episoids'
    public writingPageCreationUrl = environment.services_prefix + 'novelcomics/api/create-novel-episoid-page';
    public getWritingPagesUrl = environment.services_prefix + 'novelcomics/api/get-all-novel-episoid-pages';
    public getWritingSinglePageUrl = environment.services_prefix + 'novelcomics/api/novel-episoid-parts';
    public publishChapterUrl = environment.services_prefix + 'post/api/add-novel-to-logs';
    public createComicUrl = environment.services_prefix + 'novelcomics/api/create-comic';
    public getComicsUrl = environment.services_prefix + 'novelcomics/api/get-all-comics';
    public getSpecifiedComicUrl = environment.services_prefix + 'novelcomics/api/comics';
    public getComicPageUrl = environment.services_prefix + 'novelcomics/api/all-comic-pages';
    public saveComicPageUrl = environment.services_prefix + 'novelcomics/api/create-comic-pages';
    public getSpecificComicPageUrl = environment.services_prefix + 'novelcomics/api/comic-pages';
    public publicityCheckerUrl = environment.services_prefix + 'novelcomics/api/publish-novel';
    public getSpecificWritingUrl = environment.services_prefix + 'novelcomics/api/novels';
    public deletePageUrl = environment.services_prefix + 'novelcomics/api/novel-episoid-parts';
    public deleteChapterUrl = environment.services_prefix + 'novelcomics/api/delete-episoids-with-pages';
    public deleteComicPageUrl = environment.services_prefix + 'novelcomics/api/comic-pages';
    public getOthersWritingsUrl = environment.services_prefix + 'novelcomics/api/view-others-novels-thumbnails';
    public getOthersAllComicsUrl = environment.services_prefix + 'novelcomics/api/view-others-comics';
    public deleteComicBookUrl = environment.services_prefix + 'novelcomics/api/comics'
    public publishComicUrl = environment.services_prefix + 'novelcomics/api/publish-comic';
    constructor(
        private http: HttpClient
    ) {

    }
    createWriting(writingDetails: Writing): Observable<HttpResponse<any>> {
        return this.http.post(this.writingResourceUrl, writingDetails, { observe: 'response' })
    }

    getWritings(id: String): Observable<HttpResponse<any[]>> {
        return this.http.get<any[]>(`${this.writingThumbnailsResourceUrl}/${id}`, { observe: 'response' })

    }

    getSpecificWriting(id: string): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.getSpecificWritingUrl}/${id}`, { observe: 'response' })
    }

    getOthersWritings(id: string, friendState): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.getOthersWritingsUrl}/${id}/${friendState}`, { observe: 'response' })
    }

    // createChapter(chapterDetails: Chapter): Observable<HttpResponse<Chapter>> {
    //     return this.http.post(this.chapterCreatingResourceUrl, chapterDetails, { observe: 'response' })
    // }

    createChapter(chapterDetails: Chapter): Observable<HttpResponse<any>> {
        return this.http.post(this.chapterCreatingResourceUrl, chapterDetails, { observe: 'response' })
    }

    // getChapter(id: string): Observable<HttpResponse<Chapter>> {
    //     return this.http.get<Chapter>(`${this.chaptersGettingResourcesUrl}/${id}`, { observe: 'response' })
    // }


    getChapter(id: string): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.chaptersGettingResourcesUrl}/${id}`, { observe: 'response' })
    }

    createPage(pageDetails: WritingPage): Observable<HttpResponse<any>> {
        return this.http.post(this.writingPageCreationUrl, pageDetails, { observe: 'response' });
    }

    getPage(id: string): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.getWritingPagesUrl}/${id}`, { observe: 'response' })
    }

    getFullPage(id: string): Observable<HttpResponse<WritingPage>> {
        return this.http.get<WritingPage>(`${this.getWritingSinglePageUrl}/${id}`, { observe: 'response' })
    }

    publishChapter(publishDetails: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(this.publishChapterUrl, publishDetails, { observe: 'response' });
    }

    publicityChecker(id: string): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.publicityCheckerUrl}/${id}`, { observe: 'response' })
    }

    deletePage(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.deletePageUrl}/${id}`, { observe: 'response' });
    }

    deleteChapter(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.deleteChapterUrl}/${id}`, { observe: 'response' })
    }

    // services related for the comics

    getAllComics(id: string): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.getComicsUrl}/${id}`, { observe: 'response' })
    }

    getOthersAllComics(id: string, friendState): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.getOthersAllComicsUrl}/${id}/${friendState}`, { observe: 'response' })
    }

    createComics(comicDetails): Observable<HttpResponse<any>> {
        return this.http.post<any>(this.createComicUrl, comicDetails, { observe: 'response' })
    }

    getSpecifiedComic(id: string): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.getSpecifiedComicUrl}/${id}`, { observe: 'response' })
    }

    getComicPage(id: string): Observable<HttpResponse<any[]>> {
        return this.http.get<any>(`${this.getComicPageUrl}/${id}`, { observe: 'response' })
    }

    saveComicPage(comicPage): Observable<HttpResponse<any[]>> {

        return this.http.post<any>(this.saveComicPageUrl, comicPage, { observe: 'response' })
    }

    getSpecificComicPage(id: string): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.getSpecificComicPageUrl}/${id}`, { observe: 'response' })

    }

    deleteComicPage(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.deleteComicPageUrl}/${id}`, { observe: 'response' })
    }

    deleteComicBook(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.deleteComicBookUrl}/${id}`, { observe: 'response' })
    }

    publishComic(id: string): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.publishComicUrl}/${id}`, { observe: 'response' })
    }
}