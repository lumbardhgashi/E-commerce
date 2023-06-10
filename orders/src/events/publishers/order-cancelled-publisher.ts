import { OrderCancelledEvent, Publisher, Subjects } from "@aaecomm/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}