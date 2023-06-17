import {
  BadRequestError,
  requireAuth,
  validateRequest,
} from "@aaecomm/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Order, OrderStatus } from "../models/order";
import { natsWrapper } from "../nats-wrapper";
import { OrderItem, OrderItemDoc } from "../models/orderItem";
import { Product } from "../models/product";
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher";

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 1 * 120;

router.post(
  "/api/orders",
  requireAuth("user"),
  [
    body("cartItems")
      .isArray({ min: 1 })
      .withMessage("cartItems must be provided as an array")
      .custom((cartItems: any[]) => {
        // Validate the structure of each product object in the array
        return cartItems.every(
          (cartItem) =>
            typeof cartItem.productId === "string" &&
            typeof cartItem.quantity === "number" &&
            cartItem.quantity > 0
        );
      })
      .withMessage("Invalid product(s) provided"),
    body("shippingDetails")
      .isObject()
      .withMessage("Shipping details must be provided as an object")
      .notEmpty()
      .withMessage("Shipping details must not be empty")
      .bail()
      .custom((shippingDetails) => {
        // Validate the structure of the shipping details object
        return (
          typeof shippingDetails.fullName === "string" &&
          typeof shippingDetails.address1 === "string" &&
          typeof shippingDetails.city === "string" &&
          typeof shippingDetails.zip === "string" &&
          typeof shippingDetails.country === "string"
        );
      })
      .withMessage("Invalid shipping details provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { cartItems, shippingDetails } = req.body;

    const orderItems: OrderItemDoc[] = await Promise.all(
      cartItems.map(async (cartItem: any) => {
        const product = await Product.findById(cartItem.productId);

        if(!product) {
          throw new BadRequestError("Product(s) not found")
        }

        const orderItem = OrderItem.build({
          product: product!,
          quantity: cartItem.quantity,
        });
        await orderItem.save();

        return orderItem;
      })
    );

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const order = Order.build({
      userId: req.currentUser!.id,
      expiresAt: expiration,
      orderItems,
      shippingDetails,
      status: OrderStatus.Created
    })

    await order.save()

    console.log(order, "CREATED ORDER");

    console.log("3. Expires at:", order.expiresAt);

    const formattedOrderItems = order.orderItems.map((orderItem) => ({
      product: {
        id: orderItem.product._id,
        price: orderItem.product.price
      },
      quantity: orderItem.quantity,
    }));
    
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order._id,
      expiresAt: order.expiresAt,
      status: order.status,
      orderItems: formattedOrderItems,
      version: order.version,
      userId: order.userId
    })

    res.status(200).send(order);
  }
);

export { router as newOrderRouter };
