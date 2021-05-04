import { ICreator } from "./creator.model";

export interface IFullProfileDetails {
    account?: Account;
    userProfileDetails?: ICreator;
}

export class FullProfileDetails {
    constructor(
        public account?: Account,
        public userProfileDetails?: ICreator) { }
}