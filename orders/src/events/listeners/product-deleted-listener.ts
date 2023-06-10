import { Listener, Subjects, ProductDeletedEvent } from "@aaecomm/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Product } from "../../models/product";

export class ProductDeletedListener extends Listener<ProductDeletedEvent> {
    subject: Subjects.ProductDeleted = Subjects.ProductDeleted;

    queueGroupName: string = queueGroupName;

    async onMessage(data: ProductDeletedEvent['data'], msg: Message) {
        const {id} = data;

        await Product.findByIdAndDelete(id)

        msg.ack()
    }
}