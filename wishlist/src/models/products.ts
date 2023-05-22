import  mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

export interface ProductAttrs{
    id: string;
    //image: string;
    name: string;
    price: number;
}

export interface ProductDoc extends mongoose.Document{
    id: string;
    //image: string;
    name: string;
    price: number;
    version: number;
}

export interface ProductModel extends mongoose.Model<ProductDoc>{
    build(attrs: ProductAttrs): ProductDoc;
}

const productSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        price:{
            type: Number,
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


productSchema.set('versionKey', 'version')
productSchema.plugin(updateIfCurrentPlugin);

productSchema.statics.build = (attrs: ProductAttrs)=> {
    return new Product(attrs);
};

const Product = mongoose.model<ProductAttrs, ProductModel>("Product", productSchema);

export {Product}