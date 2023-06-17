import { IBase } from "../base";
export interface IPayment extends IBase {
    orderId: string;
    stripeId: string;
}
