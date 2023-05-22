import { ProductUpdatedEvent, Publisher, Subjects } from "@aaecomm/common";


export class ProductUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
    subject: Subjects.ProductUpdated = Subjects.ProductUpdated
}