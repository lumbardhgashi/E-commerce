import { IBase } from "../base";
import { IProduct } from "../product/product";
export interface ICartItem extends IBase {
    product: IProduct;
    quantity: number;
}
