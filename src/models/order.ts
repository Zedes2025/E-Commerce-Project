import { Schema, model } from "mongoose";

const orderItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [orderItemSchema],
    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true },
);

export default model("Order", orderSchema);
