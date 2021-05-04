import { IImagePost } from "./image.post";

export interface IPostDetails {

    // listPostDetails?: IImagePost[];
    listPostDetails?:any[];
    postOwnerIds?: any[];
    creationsDetails?: any[]
}

export class PostDetails implements IPostDetails {

   // public listPostDetails?: IImagePost[];
    public listPostDetails?: any[];
    public postOwnerIds?: any[];
    public creationsDetails?: any[];

}