import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  getCategories,
  updateCategory,
} from "#controllers";
const categoryRoutes = Router();

categoryRoutes
  .route("/")
  .get(getCategories)
  .post(/*validateBodyZod(categorySchema),*/ createCategory);
categoryRoutes
  .route("/:categoryId")
  .get(getCategoryById)
  .put(/*validateBodyZod(categorySchema),*/ updateCategory)
  .delete(deleteCategory);

export default categoryRoutes;
