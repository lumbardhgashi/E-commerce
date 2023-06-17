import { IBase } from "../base";
import { ITimestamps } from "../timestamps";

export interface IUser extends IBase, ITimestamps {
    username: string,
    email: string,
    password: string,
    role: string[]
  }