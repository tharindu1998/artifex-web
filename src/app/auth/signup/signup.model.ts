export interface IUserRegistration{
    langKey?: string;
    login?: string;
    email?: string;
    password?: string;
    
}

export class UserRegistration implements IUserRegistration{
    
    constructor(
        public login?: string,
        public email?: string,
        public password?: string,
        public langKey?: string
    ){}
}
