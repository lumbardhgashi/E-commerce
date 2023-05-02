import { Subjects } from "./subjects";
import { OrderStatus } from "./types/order-status";

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    status: OrderStatus;
    userId: string;
    version: number;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    };
  };
}
