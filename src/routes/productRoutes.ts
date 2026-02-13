import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "#controllers";
import { productCreateSchema, productUpdateSchema } from "#schemas";
import { validateBody } from "#middlewares";

const productRoutes = Router();

productRoutes
  .route("/")
  .get(getProducts)
  .post(validateBody(productCreateSchema), createProduct);
productRoutes
  .route("/:id")
  .get(getProductById)
  .put(validateBody(productUpdateSchema), updateProduct)
  .delete(deleteProduct);

export default productRoutes;
