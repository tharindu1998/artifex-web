export interface IFCMToken{

    fcmToken ?: string;
    id ?: string;
    personId ?: string;


}

export class FCMToken implements IFCMToken{

    constructor(

        public fcmToken ?: string,
        public id ?: string,
        public personId ?: string
        
    ){}




}