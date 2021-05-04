import { Moment } from "moment";
import { AdvertisementCategory } from "./AdvertisementCategory.model";

export interface IAdvertisement{
    id?: string;
    expired?: boolean;
    addOwnerId?: string
    createdDateTime?: Moment
    displayDuration?: number
    adGraphic?: string
    caption?: string
    expireDate?: Moment
    amount?: string,
    duration?: number,
    category?: AdvertisementCategory;
    paid?:boolean

}


export class Advertisement implements IAdvertisement{
    constructor(
        public id?: string,
        public expired?: boolean,
        public addOwnerId?: string,
        public createdDateTime?: Moment,
        public displayDuration?: number,
        public adGraphic?: string,
        public caption?: string,
        public expireDate?: Moment,
        public amount?: string,
        public duration?: number,
        public category?: AdvertisementCategory,
        public paid?: boolean
    ){

    }
}
