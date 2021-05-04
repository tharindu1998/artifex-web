import { Moment } from "moment";

export interface IChapter {
    id?: string;
    mainPostid?: string;
    createDate?: Moment;
    type?: string;
    category?: string;
    chapter?: string;
    lastUpdateDate?: Moment;
    published?: boolean
}

export class Chapter implements IChapter {
    constructor(
        public id?: string,
        public mainPostid?: string,
        public createDate?: Moment,
        public type?: string,
        public category?: string,
        public chapter?: string,
        public lastUpdateDate?: Moment,
        public published?: boolean
    ){}
}

