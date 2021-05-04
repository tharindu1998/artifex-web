import { Moment } from "moment";

export interface IPostComment {
    id?: string;
    postId?: string;
    commentedUserId?: string;
    comment?: string;
    commentDateTime?: Moment;
    postType?: string;
    
}


export class PostComment implements IPostComment {
    constructor(
        public id?: string,
        public postId?: string,
        public commentedUserId?: string,
        public comment?: string,
        public commentDateTime?: Moment,
        public postType?: string
    ){

    }
}