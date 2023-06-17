import { IOrder } from "src/types/order/order";
import { Subjects } from "./subjects";
import { OrderStatus } from "./types/order-status";

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    orderItems: {
      product: {
        id: string,
        price: number
      },
      quantity: number,
    }[];
    status: OrderStatus;
    expiresAt: Date;
    userId: string;
    version: number;
  }
}
