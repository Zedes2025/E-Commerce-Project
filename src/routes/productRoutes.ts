import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "#controllers";
const productRoutes = Router();

productRoutes
  .route("/")
  .get(getProducts)
  .post(/*validateBodyZod(productSchema),*/ createProduct);
productRoutes
  .route("/:id")
  .get(getProductById)
  .put(/*validateBodyZod(productSchema),*/ updateProduct)
  .delete(deleteProduct);

export default productRoutes;
