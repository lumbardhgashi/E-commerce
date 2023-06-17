import { IOrder } from "src/types/order/order";
import { Subjects } from "./subjects";
import { OrderStatus } from "./types/order-status";

export interface OrderPaidEvent {
  subject: Subjects.OrderPaid;
  data: {
    id: string;
    userId: string;
  }
}
