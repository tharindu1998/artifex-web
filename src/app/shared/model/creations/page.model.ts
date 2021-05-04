import { Moment } from "moment";
import { Visibility } from "../userProfile/visibility.model";


export interface IWritingPage{
    content?: string;
    createDate?: Moment;
    episoidId?: string;
    id?: string;
    message?: string;
    numberOfComments?: Number
    numberOfLikes?: Number;
    type?: string;
    visible?: Visibility;
    published?: boolean;
}


export class WritingPage implements IWritingPage {

    constructor(
        public content?: string,
        public createDate?: Moment,
        public episoidId?: string,
        public id?: string,
        public message?: string,
        public numberOfComments?: Number,
        public numberOfLikes?: Number,
        public type?: string,
        public visible?: Visibility,
        public published?: boolean
    ){

    }
   
}