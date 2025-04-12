import mongoose from "mongoose";
export const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    require: true,
    min: 0,
  },
  images: [{ type: String }],
  sku: {
    type: String,
    unique: true,
    require: true,
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true,
    require: true,
    index: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
