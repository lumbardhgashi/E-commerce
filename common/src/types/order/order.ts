import { OrderStatus } from "src/events/types/order-status";
import { IBase } from "../base";
import { ITimestamps } from "../timestamps";
import { IOrderItem } from "./orderItem";
import { IShippingDetails } from "./shippingDetails";

export interface IOrder extends IBase, ITimestamps {
  userId: string,
  cartItems: IOrderItem[]
  status: OrderStatus;
  expiresAt: Date;
  shippingDetails: IShippingDetails
}