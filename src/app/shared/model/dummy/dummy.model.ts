
export interface IDummy{

    id?:string;
    name?:string;
    profilePic?:string;
    accept?: boolean;

}

export class Dummy implements IDummy{
    constructor(
        public id?:string,
        public name ?:string,
        public profilePic?:string,
        public accept?: boolean
    ){}
}