import { type CategoryType } from "#types";
import { Category } from "#models";
import { type RequestHandler } from "express";
import { isValidObjectId } from "mongoose";

export const getCategories: RequestHandler = async (req, res) => {
  const categories = await Category.find().lean();
  res.json(categories);
};

export const getCategoryById: RequestHandler = async (req, res) => {
  const {
    params: { categoryId },
  } = req;
  if (!isValidObjectId(categoryId))
    throw new Error("Invalid category id", { cause: { status: 400 } });
  const category = await Category.findById(categoryId).lean();
  if (!category)
    throw new Error("Category not found", { cause: { status: 404 } });
  res.json(category);
};

export const createCategory: RequestHandler = async (req, res) => {
  const {
    body: { name },
  } = req;
  const exists = await Category.findOne({ name });
  if (exists)
    throw new Error("Category already exists", { cause: { status: 400 } });
  //Create category
  const category = await Category.create({
    name,
  });

  res.status(201).json(category);
};

export const updateCategory: RequestHandler = async (req, res) => {
  const {
    params: { categoryId },
    body,
  } = req;
  if (!isValidObjectId(categoryId))
    throw new Error("Invalid id", { cause: { status: 400 } });
  const { name } = body;
  const category = await Category.findByIdAndUpdate(categoryId, name, {
    new: true,
  }).lean();
  if (!category)
    throw new Error("Category not found", { cause: { status: 404 } });
  res.json(category);
};

export const deleteCategory: RequestHandler = async (req, res) => {
  const {
    params: { categoryId },
  } = req;
  if (!isValidObjectId(categoryId))
    throw new Error("Invalid id", { cause: { status: 400 } });
  const category = await Category.findByIdAndDelete(categoryId);
  if (!category)
    throw new Error("Category not found", { cause: { status: 404 } });
  res.json({ message: "Category deleted" });
};
