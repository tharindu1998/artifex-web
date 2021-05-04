export interface IAddress{
    address1?: string;
    address2?: string;
    city?: string;
    country?: string;
    postalCode?: string;
}

export class Address implements IAddress{
    constructor(
        public address1?: string,
        public address2?: string,
        public city?: string,
        public country?: string,
        public postalCode?: string,
    ){}
}