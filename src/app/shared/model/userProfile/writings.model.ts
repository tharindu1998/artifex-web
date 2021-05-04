import { Moment } from "moment";
import { Visibility } from "./visibility.model";

export interface IWriting {
    id?: string;
    postOwnerId?: string;
    novelName?: string;
    createDate?: Moment;
    message ?:string;
    numberOfLikes?: Number;
    numberOfShares ?:Number;
    visible?: Visibility;
    type ?:string;
    author?: string;
    imageUrl?: string;
}

export class Writing implements IWriting{
    constructor(
        public id?: string,
        public postOwnerId?: string,
        public novelName?: string,
        public createDate?: Moment,
        public message ?:string,
        public numberOfLikes?: Number,
        public numberOfShares ?:Number,
        public visible?: Visibility,
        public type ?:string,
        public author?: string,
        public imageUrl?: string
    ){

    }
}