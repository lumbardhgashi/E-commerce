import { Subjects } from "./subjects";
import { OrderStatus } from "./types/order-status";
export interface OrderCancelledEvent {
    subject: Subjects.OrderCancelled;
    data: {
        id: string;
        orderItems: {
            product: {
                id: string;
                price: number;
            };
            quantity: number;
        }[];
        status: OrderStatus;
        expiresAt: Date;
        userId: string;
        version: number;
    };
}
