import { OrderCreatedEvent, Publisher, Subjects } from "@aaecomm/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}