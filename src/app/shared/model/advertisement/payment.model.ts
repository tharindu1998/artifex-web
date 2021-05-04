import { Moment } from "moment";
export interface IPayment {
     advertistmentId?: string
     paidDate?: Moment
     amount?: string
     orderId?: string
     paidBy?: string
     paidPersonEmail?: string

   
}

export class Payment implements IPayment{
    constructor(
        public advertistmentId?: string,
        public paidDate?: Moment,
        public amount?: string,
        public orderId?: string,
        public paidBy?: string,
        public paidPersonEmail?: string
    ){

    }
}