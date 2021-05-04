import { Visibility } from "../userProfile/visibility.model";
import { Moment } from "moment";

export class IComicDetails {
    id?: string;
    comicName?: string;
    author?: string;
    visible?: Visibility;
    createDate?: Moment;
    publishedDate?: Moment;
    coverPhoto?: string;
    description?: string;
    postOwnerId?: string;

}

export class ComicDetails implements IComicDetails {
    constructor(
        public id?: string,
        public comic_name?: string,
        public comicOwnerId?: string,
        public author?: string,
        public visible?: Visibility,
        public createdDate?: Moment,
        public publishedDate?: Moment,
        public cover_photo?: string,
        public description?: string,
        public postOwnerId?: string
    ) { }
}