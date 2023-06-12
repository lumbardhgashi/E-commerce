import { PaymentCreatedEvent, Publisher, Subjects } from "@aaecomm/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}