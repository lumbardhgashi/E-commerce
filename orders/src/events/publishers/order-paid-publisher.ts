import { OrderPaidEvent, Publisher, Subjects } from "@aaecomm/common";

export class OrderPaidPublisher extends Publisher<OrderPaidEvent> {
    subject: Subjects.OrderPaid = Subjects.OrderPaid;
}