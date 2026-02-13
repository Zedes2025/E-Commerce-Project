import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  getCategories,
  updateCategory,
} from "#controllers";
import { categoryCreateSchema, categoryUpdateSchema } from "#schemas";
import { validateBody } from "#middlewares";
const categoryRoutes = Router();

categoryRoutes
  .route("/")
  .get(getCategories)
  .post(validateBody(categoryCreateSchema), createCategory);
categoryRoutes
  .route("/:categoryId")
  .get(getCategoryById)
  .put(validateBody(categoryUpdateSchema), updateCategory)
  .delete(deleteCategory);

export default categoryRoutes;
