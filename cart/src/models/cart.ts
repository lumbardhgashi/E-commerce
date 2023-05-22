import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface CartAttrs {
    id: number;
    userId: number;
    cmimiTotal: number;
    cartItems: string; // should fix
}

export interface CartDoc extends mongoose.Document{
    id: number;
    userID: number;
    cmimiTotal: number;
    cartItems: string;
    // createdAt: Date;
    // updatedAt: Date;
    version: number;
}

interface CartModel extends mongoose.Model<CartDoc> {
    build(attrs: CartAttrs): CartDoc;
}

const cartSchema = new mongoose.Schema(
    {
        id:{
            type: Number,
            required: true,
        },
        userID:{
            type: mongoose.Schema.Types.ObjectId,
            required: true, // Should check
        },
        cmimTotal:{
            type: Number,
            required: true,
        },
        cartitems:{
            type: String,
            required: true,
        },
        // createdAt:{
        //     type: mongoose.Schema.Types.Date,
        // },
        // updatedAt:{
        //     type: mongoose.Schema.Types.Date,
        // },
    },
    {
        toJSON:{
            transform(doc, ret){
                ret.id = ret._id;
                delete ret._id;
            },
        },
        timestamps: true,
    }
);

// cartSchema.pre("save", function (next){
//     const now = new Date();
//     this.updatedAt = now;
//     if(!this.createdAt){
//         this.createdAt = now;
//     }
//     next();
// });

// cartSchema.pre("updateOne", function(next) {
//     const now = new Date();
//     this.set({updatedAt: now});
//     next();
// });

cartSchema.set('versionKey','version')
cartSchema.plugin(updateIfCurrentPlugin);

cartSchema.statics.build = (attrs: CartAttrs) => {
    return new Cart(attrs);
};

const Cart = mongoose.model<CartDoc, CartModel>("Cart", cartSchema);

export {Cart};