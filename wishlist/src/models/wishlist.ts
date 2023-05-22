import  mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface WishlistAttrs{
    id: number;
    userId: number;
    item: string; 
}

export interface WishlistDoc extends mongoose.Document{
    id: number;
    userId: number;
    item: string;
    createdAt: Date;
    updatedAt: Date;
    version: number;
}

interface WishlistModel extends mongoose.Model<WishlistDoc>{
    build(attrs: WishlistAttrs): WishlistDoc;
}

const wishlistSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
        },
        userId: {
            type: Number,
            required: true,
        },
        item: {
            type: String,
            required: true,
        },
        updatedAt: {
            type: mongoose.Schema.Types.Date,
        },
        createdAt: {
            type: mongoose.Schema.Types.Date,
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

wishlistSchema.pre("save", function(next) {
    const now = new Date();
    this.updatedAt = now;
    if(!this.createdAt){
        this.createdAt = now;

    }
    next();
});

wishlistSchema.pre("updateOne" , function (next) {
    const now = new Date();
    this.set({ updatedAt: now });
    next();
});

wishlistSchema.set('versionKey', 'version')
wishlistSchema.plugin(updateIfCurrentPlugin);

wishlistSchema.statics.build = (attrs: WishlistAttrs)=> {
    return new Wishlist(attrs);
};

const Wishlist = mongoose.model<WishlistDoc, WishlistModel>("Wishlist", wishlistSchema);

export {Wishlist}