import { IUserProfile, UserProfile } from "./user-profile.model";
import { IUserProfilePicture, UserProfilePicture } from "./user-profile-picture.model";
import { IUser, User } from "app/core";

export interface ICreator {
    user?: IUser;
    userProfile?: IUserProfile;
    userProfilePicture?: IUserProfilePicture;
   
}

export class Creator implements ICreator {
    constructor(
        public userProfile?: UserProfile,
        public userProfilePicture?: UserProfilePicture,
        public user?: User
       
    ){}
}