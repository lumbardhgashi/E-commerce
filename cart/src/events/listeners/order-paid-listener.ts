import { Listener, Subjects, OrderPaidEvent, NotFoundError } from "@aaecomm/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Product } from "../../models/product";
import { Cart } from "../../models/cart";

export class OrderPaidListener extends Listener<OrderPaidEvent> {
    subject: Subjects.OrderPaid = Subjects.OrderPaid;

    queueGroupName: string = queueGroupName;

    async onMessage(data: OrderPaidEvent['data'], msg: Message) {
        const { userId} = data;

        const cart = await Cart.findOne({
            userId
        })

        if(!cart) {
            throw new NotFoundError()
        }

        await cart.clearCart()

        msg.ack()
    }
}