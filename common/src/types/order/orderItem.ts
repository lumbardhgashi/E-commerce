import { IBase } from "../base";
import { IProduct } from "../product/product";

export interface IOrderItem extends IBase {
  product: IProduct,
  quantity: number
}