import  mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { ProductDoc } from "./products";


export interface WishlistAttrs{
    id: string;
    userId: string;
    products: ProductDoc[]; 
}

export interface WishlistDoc extends mongoose.Document{
    id: string;
    userId: string;
    products: ProductDoc[]; 
    version: number;
}

export interface WishlistModel extends mongoose.Model<WishlistDoc>{
    build(attrs: WishlistAttrs): WishlistDoc;
}

const wishlistSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        products:{
            type: Array,
            required: true,
        },
       
    },
    {
        toJSON: {
            transform(doc, ret){
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);


wishlistSchema.set('versionKey', 'version')
wishlistSchema.plugin(updateIfCurrentPlugin);

wishlistSchema.statics.build = (attrs: WishlistAttrs)=> {
    return new Wishlist(attrs);
};

const Wishlist = mongoose.model<WishlistDoc, WishlistModel>("Wishlist", wishlistSchema);

export {Wishlist}