import { Moment } from 'moment';

export enum FriendState{
        FRIEND, UNFRIEND, BLOCK , REQUESTED
}


export interface IFriendRequest{
    id?:string;
    userId?:string;
    requestedPersonId?:string;
    requestedDate?:Moment;
    accepted?:FriendState;       //changed accepted from type FriendRequest to string
    acceptedDate?: Moment
}

export class FriendRequest implements IFriendRequest{
    constructor(
        public id?:string,
        public userId?:string,
        public requestedPersonId?:string,
        public requestedDate?:Moment,
        public accepted?:FriendState,
        public acceptedDate?: Moment
        
    ){}

}