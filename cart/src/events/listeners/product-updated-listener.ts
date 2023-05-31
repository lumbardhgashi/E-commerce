import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Product } from "../../models/product";
import { Listener, ProductUpdatedEvent, Subjects } from "@aaecomm/common";

export class ProductUpdatedListener extends Listener<ProductUpdatedEvent> {
  subject: Subjects.ProductUpdated = Subjects.ProductUpdated;

  queueGroupName: string = queueGroupName;

  async onMessage(data: ProductUpdatedEvent["data"], msg: Message) {
    const { id, description, name, price, stock } = data;

    const product = await Product.findByEvent(data)

    if (!product) {
      throw new Error("Ticket not found");
    }

    product.set({
      description,
      name,
      price,
      stock,
    });

    await product.save();

    msg.ack();
  }
}
