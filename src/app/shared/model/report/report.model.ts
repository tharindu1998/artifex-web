import { Moment } from "moment";

export interface IReport {
    postId?: string
    type?: string
    reportPersonId?: string
    reportDateTime?:Moment;
    firstReferncePostId?: string
    postOwnerId?: string
}

export class Report implements IReport{
    constructor(
        public postId?: string,
        public type?: string,
        public reportPersonId?: string,
        public reportDateTime?: Moment,
        public firstReferencePostId?: string,
        public postOwnerId?: string
    ){
        
    }
}