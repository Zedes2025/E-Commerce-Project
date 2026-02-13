import { z } from "zod/v4";

export const userCreateSchema = z.strictObject({
  name: z.string().trim().min(3, "Enter a valid name"),
  email: z.email().trim().toLowerCase(),
  //  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  address: z.string().trim().min(1, "Address is required"),
});

export const userUpdateSchema = userCreateSchema
  .omit({ password: true })
  .partial();
