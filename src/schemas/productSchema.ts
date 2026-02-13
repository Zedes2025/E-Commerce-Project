import { z } from "zod/v4";
import { isValidObjectId } from "mongoose";
export const productCreateSchema = z.object({
  name: z.string().min(1, "Enter a valid product"),
  description: z
    .string()
    .min(10, "Description required")
    .max(1000, "Description too long"),
  price: z.number().positive("Price must be a positive number"),
  categoryId: z
    .string()
    .min(1, "Category is required")
    .refine((val) => isValidObjectId(val), "Invalid category ID"),
});

export const productUpdateSchema = productCreateSchema.partial();
