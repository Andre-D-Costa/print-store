import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,
        iva: Number,
        quantity: Number,
      },
    ],
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
    },
    stripePaymentId: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["processing", "completed", "shipped", "cancelled"],
      default: "processing",
    },
  },
  { timestamps: true }
);
