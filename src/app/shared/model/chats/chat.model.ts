
import { Moment } from "moment";

export interface IChat{

    id?: string;
    sendPersonId?: string;
    receivedPeronId?: string;
    chatDateTime?: Moment;
    message?: string;
    userFCMToken?: string;
    senderName?: String;
    senderImageUrl?: String;

}

export class Chat implements IChat{

constructor(

    public id?: string,
    public sendPersonId?: string,
    public receivedPeronId?: string,
    public chatDateTime?: Moment,
    public message?: string,
    public userFCMToken?: string,
    public senderName?: String,
    public senderImageUrl?: String


){}




}