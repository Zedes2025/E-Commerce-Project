import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrder,
} from "#controllers";
const orderRoutes = Router();

orderRoutes
  .route("/")
  .get(getOrders)
  .post(/*validateBodyZod(orderSchema),*/ createOrder);
orderRoutes
  .route("/:id")
  .get(getOrderById)
  .put(/*validateBodyZod(orderSchema),*/ updateOrder)
  .delete(deleteOrder);

export default orderRoutes;
