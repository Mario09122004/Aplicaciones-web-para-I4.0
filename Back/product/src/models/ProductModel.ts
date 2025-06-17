import { Document, model, Schema, Types } from "mongoose";

export interface IProduct extends Document {
  _id: Types.ObjectId,
  name: string,
  price: number,
  Qty: number,
  status: boolean,
  desc: number,
  createDate: Date,
  deleteDate: Date,
}
const productSchema = new Schema<IProduct>({
    name: { 
        type: String, 
        required: true
    },
    price: { 
        type: Number, 
        required: true 
    },
    Qty: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: Boolean, 
        default: true 
    },
    desc: { 
        type: Number, 
        required: true 
    },
    createDate: { 
        type: Date, 
        default: Date.now 
    },
    deleteDate: { 
        type: Date, 
        default: null 
    }

});

export const Product = model<IProduct>("Rol", productSchema, "rol");
