import { Moment } from "moment";
import { Visibility } from "./visibility.model";


export interface IAlbumPost {
    id?: string
    postOwnerId?: string;
    createDateTime?: Moment;
    sharedDateTime?: Moment;
    content?: any;
    contentContentType?: string;
    message?: string;
    numberOfLikes?: Number;
    numberOfShares?: Number;
    visible?: Visibility;
    type?: string;
    originalPostId?: string;
    imageUrls?: string[];
    messages?: string[];
    albumName?: string;
    isLiked?: boolean;
    category?: string;
}

export class AlbumPost implements IAlbumPost {

    constructor(
        public id?: string,
        public postOwnerId?: string,
        public createDateTime?: Moment,
        public sharedDateTime?: Moment, 
        public content?: any,
        public contentContentType?: string,
        public message?: string,
        public numberOfLikes?: Number,
        public numberOfShares?: Number,
        public visible?: Visibility,
        public type?: string,
        public  originalPostId?: string,
        public  imageUrls?: string[],
        public albumName?: string,
        public messages?: string[],
        public isLiked?: boolean,
        public category?: string
    ){

    }
    
}