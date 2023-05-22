import { IBase } from "./base";
import { ICategory } from "./category";
export interface IProduct extends IBase {
    name: string;
    description: string;
    category: ICategory;
    price: number;
    stock: number;
}
