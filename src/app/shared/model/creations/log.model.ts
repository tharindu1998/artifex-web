import { Moment } from "moment";
import { Visibility } from "../userProfile/visibility.model";


export class ILog {
    category?: string;
    createDateTime?: Moment;
    firstReferencePostId?: string;
    id?: string;
    lastUpdatePost?: string;
    postId?: string;
    postOwnerId?: string;
    type?: string;
    visible?: Visibility
}

export class Log implements ILog {
    constructor(
        public category?: string,
        public createDateTime?: Moment,
        public firstReferencePostId?: string,
        public id?: string,
        public lastUpdatePost?: string,
        public postId?: string,
        public postOwnerId?: string,
        public type?: string,
        public visible?: Visibility){}
   
    
}