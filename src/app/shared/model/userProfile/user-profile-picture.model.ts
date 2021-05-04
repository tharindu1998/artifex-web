import { Moment } from 'moment';

export interface IUserProfilePicture {
    id?: string;
    userId?: string;
    profilePictureContentType?: string;
    profilePicture?: any;
    currentProfilePicture?: boolean;
    createDate?: Moment;
    caption?: string;
    base64Image?: string;
    imageUrl?: string;
}

export class UserProfilePicture implements IUserProfilePicture {
    constructor(
        public id?: string,
        public userId?: string,
        public profilePictureContentType?: string,
        public profilePicture?: any,
        public currentProfilePicture?: boolean,
        public createDate?: Moment,
        public caption?: string,
        public  base64Image?: string,
        public imageUrl?: string
    ) {
        this.currentProfilePicture = this.currentProfilePicture || false;
    }
}
