import { Moment } from "moment";

export const enum Visibility {
    ONLY_ME = 'ONLY_ME',
    ONLY_FRIENDS = 'ONLY_FRIENDS',
    PUBLIC = 'PUBLIC'
}


export interface IImagePost {
    profileName?: string;
    id?: string
    postOwnerId?: string;
    createDate?: Moment;
    content?: any;
    contentContentType?: string;
    liked?: boolean;
    message?: string;
    numberOfLikes?: Number;
    numberOfComments?: Number;
    numberOfShares?: Number;
    numberOfImages?: Number;
    visible?: Visibility;
    type?: string;
    imageUrl?: string;
    imageUrls?: string[];
    videoUrls?: string[];
    mainImagePostId?: string;
    albumId?: string;
    category?: string;
    originalPostId?: string;
    postSharePersonId?: string;
    sharedDateTime?: Moment;
    sharedMassege?: string;
    subType?: string;
}

export class ImagePost implements IImagePost {

    constructor(
        public profileName?: string,
        public id?: string,
        public postOwnerId?: string,
        public createDate?: Moment,
        public content?: any,
        public contentContentType?: string,
        public liked?: boolean,
        public message?: string,
        public numberOfLikes?: Number,
        public numberOfComments?: Number,
        public numberOfShares?: Number,
        public numberOfImages?: Number,
        public visible?: Visibility,
        public type?: string,
        public imageUrl?: string,
        public imageUrls?: string[],
        public videoUrls?: string[],
        public mainImagePostId?: string,
        public albumId?: string,
        public category?: string,
        public originalPostId?: string,
        public postSharePersonId?: string,
        public sharedDateTime?: Moment,
        public sharedMassege?: string,
        public subType?: string
       
    ){

    }
    
}