import mongoose from "mongoose";
import { CartItem, CartItemDoc } from "./cartItem";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { ProductDoc } from "./product";
import { BadRequestError, ICart } from "@aaecomm/common";

export interface CartAttrs extends Pick<ICart, "userId"> {
  cartItems: CartItemDoc[];
}

export interface CartDoc extends Omit<ICart, "id" | "cartItems">, mongoose.Document {
  cartItems: CartItemDoc[];
  addItemsToCart(product: ProductDoc, quantity: number): Promise<void>;
  removeItemsFromCart(product: ProductDoc, quantity: number): Promise<void>;
  clearCart(): Promise<void>;
}

interface CartModel extends mongoose.Model<CartDoc> {
  build(attrs: CartAttrs): CartDoc;
  findOrCreate(userId: string): Promise<CartDoc>;
}

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    cartItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CartItem",
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

cartSchema.set("versionKey", "version");
cartSchema.plugin(updateIfCurrentPlugin);

cartSchema.statics.findOrCreate = async (userId: string) => {
  let cart: CartDoc | null = await Cart.findOne({
    userId: userId,
  }).populate({
    path: "cartItems",
    populate: {
      path: "product",
      model: "Product",
    },
  });

  if (!cart) {
    cart = Cart.build({
      userId: userId,
      cartItems: [],
    });

    await cart.save();
  }

  return cart;
};

cartSchema.statics.build = (attrs: CartAttrs) => {
  return new Cart(attrs);
};

cartSchema.methods.addItemsToCart = async function (
  product: ProductDoc,
  quantity: number
): Promise<void> {
  await this.populate({
    path: "cartItems",
    populate: {
      path: "product",
      model: "Product",
    },
  });
  // Check if the product already exists in the cart
  const existingCartItem = this.cartItems.find(
    (item: CartItemDoc) => item.product._id.toString() === product.id.toString()
  );
  if (existingCartItem) {
    const cartItem = await CartItem.findById(existingCartItem._id);
    cartItem!.quantity += quantity;
    await cartItem?.save();
    existingCartItem.quantity += quantity;
  } else {
    const cartItem = CartItem.build({
      product: product,
      quantity,
    });
    await cartItem.save();
    this.cartItems.push(cartItem);
  }

  // Save the cart
  await this.save();
};

cartSchema.methods.removeItemsFromCart = async function (
  product: ProductDoc,
  quantity: number
): Promise<void> {
  await this.populate({
    path: "cartItems",
    populate: {
      path: "product",
      model: "Product",
    },
  });
  // Check if the product already exists in the cart
  const existingCartItem = this.cartItems.find(
    (item: CartItemDoc) => item.product._id.toString() === product.id.toString()
  );
  if (!existingCartItem) {
    throw new BadRequestError("Product doesn't exist in this cart");
  }

  existingCartItem.quantity -= quantity;

  if (existingCartItem.quantity <= 0) {
    console.log("updated 1");
    await CartItem.findByIdAndDelete(existingCartItem._id);
    this.cartItems = this.cartItems.filter(
      (item: CartItemDoc) =>
        item.product._id.toString() !== product.id.toString()
    );
  }

  await CartItem.updateOne({ _id: existingCartItem._id }, existingCartItem);
  await this.save();
};

cartSchema.methods.clearCart = async function (): Promise<void> {
    // Retrieve all cart items
    const cartItems: CartItemDoc[] = this.cartItems;
  
    // Clear the cart items array in the cart
    this.cartItems = [];
  
    // Save the updated cart
    await this.save();
}

const Cart = mongoose.model<CartDoc, CartModel>("Cart", cartSchema);

export { Cart };
