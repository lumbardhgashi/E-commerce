import { Listener, Subjects, ProductCreatedEvent } from "@aaecomm/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Product } from "../../models/product";

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
    subject: Subjects.ProductCreated = Subjects.ProductCreated;

    queueGroupName: string = queueGroupName;

    async onMessage(data: ProductCreatedEvent['data'], msg: Message) {
        const {id,name, description, price, stock} = data;

        const product = Product.build({
            id,
            name,
            description,
            price,
            stock
        })

        await product.save();
        console.log(await Product.findById(id));
        msg.ack()
    }
}