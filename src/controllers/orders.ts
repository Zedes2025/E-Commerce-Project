import { type OrderType } from "#types";
import { User, Order, Product } from "#models";
import { type RequestHandler } from "express";
import { isValidObjectId } from "mongoose";

export const getOrders: RequestHandler = async (req, res) => {
  const orders = await Order.find().lean();
  // const orders = await Order.find()
  //   .populate("userId", "name email")
  //   .populate("products.productId", "name price")
  //   .lean();
  res.json(orders);
};

export const getOrderById: RequestHandler = async (req, res) => {
  const {
    params: { id },
  } = req;
  if (!isValidObjectId(id))
    throw new Error("Invalid id", { cause: { status: 400 } });
  const order = await Order.findById(id).lean();
  if (!order) throw new Error("Order not found", { cause: { status: 404 } });
  res.json(order);
};

export const createOrder: RequestHandler = async (req, res) => {
  const { userId, products } = req.body;

  // Validate userId format
  if (!isValidObjectId(userId)) {
    throw new Error("Invalid user ID", { cause: { status: 400 } });
  }
  const userExists = await User.exists({ _id: userId });
  if (!userExists) {
    throw new Error("User not found", { cause: { status: 404 } });
  }

  let total = 0;
  for (const item of products) {
    // check if each productId is valid:
    if (!isValidObjectId(item.productId)) {
      throw new Error(`Invalid productId: ${item.productId}`, {
        cause: { status: 400 },
      });
    }
    const product = await Product.findById(item.productId);
    if (!product) {
      throw new Error(`Product not found: ${item.productId}`, {
        cause: { status: 404 },
      });
    }
    total += product.price * item.quantity;
  }

  const order = await Order.create({
    userId,
    products,
    total,
  });

  res.status(201).json(order);
};

export const updateOrder: RequestHandler = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;
  //console.log("body,", body);
  if (!isValidObjectId(id))
    throw new Error("Invalid id", { cause: { status: 400 } });

  const userExists = await User.exists({ _id: body.userId });
  if (!userExists)
    throw new Error("User not found", { cause: { status: 404 } });

  let total = 0;
  for (const item of body.products) {
    // check if each productId is valid:
    if (!isValidObjectId(item.productId)) {
      throw new Error(`Invalid productId: ${item.productId}`, {
        cause: { status: 400 },
      });
    }
    const product = await Product.findById(item.productId);
    if (!product) {
      throw new Error(`Product not found: ${item.productId}`, {
        cause: { status: 404 },
      });
    }
    total += product.price * item.quantity;
  }

  const updateData: any = { ...req.body };
  if (total !== undefined) {
    updateData.total = total;
  }

  const order = await Order.findByIdAndUpdate(id, updateData, {
    new: true,
  }).lean();
  if (!order) throw new Error("Order not found", { cause: { status: 404 } });
  res.json(order);
};

export const deleteOrder: RequestHandler = async (req, res) => {
  const {
    params: { id },
  } = req;
  if (!isValidObjectId(id))
    throw new Error("Invalid id", { cause: { status: 400 } });
  const order = await Order.findByIdAndDelete(id);
  if (!order) throw new Error("Order not found", { cause: { status: 404 } });
  res.json({ message: "Order deleted" });
};
