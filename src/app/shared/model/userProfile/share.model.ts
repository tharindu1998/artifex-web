import { Moment } from "moment";
import { Visibility } from "./visibility.model";

export interface ISharePost {
        id?: string;
        postId?: string;
        postSharePersonId?: string;
        type?: string;
        sharedMassege?: string;
        createDate?: Moment;
        numberOfLikes?: Number;
        numberOfShares?: Number;
        numberOfComments?: Number;
        sharedDateTime?: Moment;
        firstReferencePostId?: string;
        visible?: Visibility
}

export class SharePost{
    constructor(
        public id?: string,
        public postId?: string,
        public postSharePersonId?: string,
        public type?: string,
        public sharedMassege?: string,
        public createDate?: Moment,
        public numberOfLikes?: Number,
        public numberOfShares?: Number,
        public numberOfComments?: Number,
        public visible?: Visibility,
        public sharedDateTime?: Moment,
        public firstReferencePostId?: string
    ){

    }
}
