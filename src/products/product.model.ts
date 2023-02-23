import mongoose, { Document } from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
});

export interface Product extends Document {
  id: string;
  title: string;
  description: string;
  price: number;
}
