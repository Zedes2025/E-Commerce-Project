import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrder,
} from "#controllers";
import { orderCreateSchema, orderUpdateSchema } from "#schemas";
import { validateBody } from "#middlewares";

const orderRoutes = Router();

orderRoutes
  .route("/")
  .get(getOrders)
  .post(validateBody(orderCreateSchema), createOrder);
orderRoutes
  .route("/:id")
  .get(getOrderById)
  .put(validateBody(orderUpdateSchema), updateOrder)
  .delete(deleteOrder);

export default orderRoutes;
