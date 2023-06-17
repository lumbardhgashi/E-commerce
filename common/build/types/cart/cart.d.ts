import { IBase } from "../base";
import { ICartItem } from "./cartItem";
export interface ICart extends IBase {
    userId: string;
    cartItems: ICartItem[];
}
