import { z } from "zod/v4";
import { isValidObjectId } from "mongoose";

const orderItemSchema = z.object({
  productId: z
    .string()
    .refine((val) => isValidObjectId(val), "Invalid product ID"),
  quantity: z.number().int().positive(),
});

export const orderCreateSchema = z.object({
  userId: z.string().refine((val) => isValidObjectId(val), "Invalid user ID"),
  products: z.array(orderItemSchema).min(1),
  total: z.number().positive().int(),
});
export const orderUpdateSchema = z.object({
  products: z.array(orderItemSchema).min(1),
});
