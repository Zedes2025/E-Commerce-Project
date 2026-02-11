import { type UserType } from "#types";
import { User } from "#models";
import { type RequestHandler } from "express";
import { isValidObjectId } from "mongoose";

export const getUsers: RequestHandler = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const getUserById: RequestHandler = async (req, res) => {
  const {
    params: { id },
  } = req;
  if (!isValidObjectId(id))
    throw new Error("Invalid id", { cause: { status: 400 } });
  const user = await User.findById(id).lean();
  if (!user) throw new Error("User not found", { cause: { status: 404 } });
  res.json(user);
};

export const createUser: RequestHandler = async (req, res) => {
  const {
    body: { email },
  } = req;
  const found = await User.findOne({ email });
  if (found)
    throw new Error("Email already exists", { cause: { status: 400 } });
  const user = await User.create(req.body);
  res.status(201).json(user);

  // remove password before sending
  //   const { password, ...userData } = user.toObject();

  //   res.status(201).json(userData);
};

export const updateUser: RequestHandler = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;
  //console.log("body,", body);
  if (!isValidObjectId(id))
    throw new Error("Invalid id", { cause: { status: 400 } });
  const user = await User.findByIdAndUpdate(id, body, { new: true }).lean();
  if (!user) throw new Error("User not found", { cause: { status: 404 } });
  res.json(user);
};

export const deleteUser: RequestHandler = async (req, res) => {
  const {
    params: { id },
  } = req;
  if (!isValidObjectId(id))
    throw new Error("Invalid id", { cause: { status: 400 } });
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error("User not found", { cause: { status: 404 } });
  res.json({ message: "User deleted" });
};
