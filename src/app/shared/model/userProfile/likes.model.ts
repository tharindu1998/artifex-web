import { Moment } from "moment";


export interface ILikes {
    id?: string;
    postId?: string;
    likedUserId?: string;
    likeDateTime?: Moment;
    postType?: string;
    
}

export class Likes implements ILikes {
    constructor(
        public id?: string,
        public postId?: string,
        public likedUserId?: string,
        public likeDateTime?: Moment,
        public postType?: string
    ) {
        
    }
}