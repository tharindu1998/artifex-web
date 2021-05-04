import { IPostComment } from "./comment.model";

export interface IFullCommentDetails {
    commentPersons ?: string[];
 //   comments?: IPostComment[];
    comments?: Map<String,IPostComment[]>;
}

export class FullCommentDetails implements IFullCommentDetails {
    constructor(
        public commentPersons?: string[],
       // public comments?: IPostComment[]
       public comments?: Map<String,IPostComment[]>
    ){

    }
}