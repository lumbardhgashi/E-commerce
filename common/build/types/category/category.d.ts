import { IBase } from "../base";
import { ITimestamps } from "../timestamps";
export interface ICategory extends IBase, ITimestamps {
    name: string;
}
