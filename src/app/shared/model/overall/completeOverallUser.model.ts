export interface ICompleteOverallUser{
    id?: any;
    email?: string;
    createdDate?: Date;
    profilePicture?: any;
    caption?: string;
    
}

export class CompleteOverallUser implements ICompleteOverallUser {
    constructor(
        public id?: any,
        public email?: string,
        public createdDate?: Date,
        public profilePicture?: any,
        public caption?: string
    ){

    }
}