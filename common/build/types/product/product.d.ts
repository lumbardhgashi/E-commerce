import { IBase } from "../base";
import { ICategory } from "../category/category";
import { ITimestamps } from "../timestamps";
export interface IProduct extends IBase, ITimestamps {
    name: string;
    image: string;
    description: string;
    category: ICategory;
    price: number;
    stock: number;
}
