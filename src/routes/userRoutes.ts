import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "#controllers";
const userRoutes = Router();

userRoutes
  .route("/")
  .get(getUsers)
  .post(/*validateBodyZod(userSchema),*/ createUser);
userRoutes
  .route("/:id")
  .get(getUserById)
  .put(/*validateBodyZod(userSchema),*/ updateUser)
  .delete(deleteUser);

export default userRoutes;
