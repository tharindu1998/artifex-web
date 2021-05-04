import { Moment } from 'moment';

export const enum Sex {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export interface IUserProfile {
    id?: string;
    displayName?: string;
    otherNames?: string;
    firstName?: string;
    lastName?: string;
    dob?: Moment;
    sex?: Sex;
    address?: string;
    created?: Moment;
    description?: string;
    status?: string;
    registered?: boolean;
    mobile?:Number;
    landNo?:Number;
    email?:string;
    academy?:string;
    type?:string;
    achievements?:string;
    organization?:string;
    designation?:string;
    posts?:string;
    duration?:string;
}

export class UserProfile implements IUserProfile {
    constructor(
        public id?: string,
        public displayName?: string,
        public otherNames?: string,
        public firstName?: string,
        public lastName?: string,
        public dob?: Moment,
        public sex?: Sex,
        public address?: string,
        public created?: Moment,
        public description?: string,
        public status?: string,
        public registered?: boolean,
        public mobile?:Number,
        public landNo?:Number,
        public email?:string,
        public academy?:string,
        public type?:string,
        public achievements?:string,
        public organization?:string,
        public designation?:string,
        public posts?:string,
        public duration?:string,
    ) {
        this.registered = this.registered || false;
    }
}
