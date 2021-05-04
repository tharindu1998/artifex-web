export const enum PrivacyPreference {
	ONLY_ME, ONLY_FRIENDS, PUBLIC, FRIENDS_OF_FRIENDS, EVERYONE
}

export interface ISecuritySettings{

    userId?:String;
	whoCanSeeMyFuturePosts?: PrivacyPreference;
    whoCanSeeMyTaggedPosts?:PrivacyPreference;
    whoCanSeeMyPastPosts?: PrivacyPreference;
    whoCanSeeMyFriendList?:PrivacyPreference;
    whoCanViewMyEmail?:PrivacyPreference;
    whoCanViewMyPhoneNumber?: PrivacyPreference;
    lastLogInDevice?:String ;
}

export class SecuritySettings implements ISecuritySettings{
    constructor(

        public userId?:String,
	    public whoCanSeeMyFuturePosts?: PrivacyPreference,
        public whoCanSeeMyTaggedPosts?:PrivacyPreference,
        public whoCanSeeMyPastPosts?: PrivacyPreference,
        public whoCanSeeMyFriendList?:PrivacyPreference,
        public whoCanViewMyEmail?:PrivacyPreference,
        public whoCanViewMyPhoneNumber?: PrivacyPreference,
        public lastLogInDevice?:String 
    )
    
    {}
}