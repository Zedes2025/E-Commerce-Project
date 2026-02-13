import { z } from "zod/v4";
export const categoryCreateSchema = z.object({
  name: z.string().trim().min(1, "Enter a valid category"),
});

export const categoryUpdateSchema = categoryCreateSchema.partial();
