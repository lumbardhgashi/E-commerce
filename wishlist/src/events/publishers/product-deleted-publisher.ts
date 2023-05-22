import { ProductDeletedEvent, Publisher, Subjects } from "@aaecomm/common";


export class ProductDeletedPublisher extends Publisher<ProductDeletedEvent> {
    subject: Subjects.ProductDeleted = Subjects.ProductDeleted
}