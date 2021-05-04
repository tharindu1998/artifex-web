export interface ICommonUser {
    userId?: string;
    profilePic?: string;
    profileName?: string;
}

export class CommonUser implements ICommonUser {
    constructor(
        public userId?: string,
        public profilePic?: string,
        public profileName?: string
    ){

    }
}