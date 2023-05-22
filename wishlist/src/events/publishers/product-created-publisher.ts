import { ProductCreatedEvent, Publisher, Subjects,  } from "@aaecomm/common";


export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
    subject: Subjects.ProductCreated = Subjects.ProductCreated
}