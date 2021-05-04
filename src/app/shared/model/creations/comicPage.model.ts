import { Moment } from "moment";
import { Visibility } from "../userProfile/visibility.model";

export interface IComicPageDetails {
    id?: string;
    createDate?: Moment;
    mainPostId?: string;
    message?: string;
    templateId?: string;
    type?: string;
    visible?: Visibility;
    comicImage1?: string;
    comicImage2?: string;
    comicImage3?: string;
    comicImage4?: string;
    comicImage5?: string;
    comicImage6?: string;



}

export class ComicPageDetails implements IComicPageDetails {
    constructor(
        public id?: string,
        public createDate?: Moment,
        public mainPostId?: string,
        public message?: string,
        public templateId?: string,
        public type?: string,
        public visible?: Visibility,
        // public comicImages?: string[]
        public comicImage1?: string,
        public comicImage2?: string,
        public comicImage3?: string,
        public comicImage4?: string,
        public comicImage5?: string,
        public comicImage6?: string

    ) {

    }
}


