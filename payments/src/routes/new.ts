import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  currentUser,
  requireAuth,
  validateRequest,
} from "@aaecomm/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Order } from "../models/order";
import { stripe } from "../stripe";
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";
import { natsWrapper } from "../nats-wrapper";
import { Payment } from "../models/payment";

const router = express.Router();

router.post(
  "/api/payments",
  currentUser,
  requireAuth("user"),
  [
    // body('token').not().isEmpty().withMessage("Token is required"),
    body("orderId").not().isEmpty().withMessage("Order is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const { orderId } = req.body;

      const order = await Order.findById(orderId);

      if (!order) {
        throw new NotFoundError();
      }

      if (order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
      }

      if (order.status === OrderStatus.Cancelled) {
        throw new BadRequestError("Cannot pay for an expired order");
      }

    //   const customer = await stripe.customers.create({
    //     email: req.currentUser?.email,
    //   });

      const paymentIntent = await stripe.paymentIntents.create({
        currency: "eur",
        amount: order.totalPrice * 100,
        payment_method_types: ['card'],
      });

      const payment = Payment.build({
        orderId,
        stripeId: paymentIntent.id,
      });

      await payment.save();

      new PaymentCreatedPublisher(natsWrapper.client).publish({
        id: payment.id,
        orderId: payment.orderId,
        stripeId: payment.stripeId,
      });

      res.status(201).send({
        id: payment.id,
        client_secret: paymentIntent.client_secret,
        orderId: orderId
      });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
);

export { router as createChargeRouter };
