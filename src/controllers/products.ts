import { type ProductType } from "#types";
import { Product, Category } from "#models";
import { type RequestHandler } from "express";
import { isValidObjectId } from "mongoose";

export const getProducts: RequestHandler = async (req, res) => {
  // const products = await Product.find();
  const { categoryId } = req.query;
  let products;

  if (categoryId) {
    if (typeof categoryId !== "string" || !isValidObjectId(categoryId)) {
      throw new Error("Invalid category Id", { cause: { status: 400 } });
    }
    products = await Product.find({ categoryId }).lean();
  } else {
    products = await Product.find().lean();
  }
  res.json(products);
};

export const getProductById: RequestHandler = async (req, res) => {
  const {
    params: { id },
  } = req;
  if (!isValidObjectId(id))
    throw new Error("Invalid id", { cause: { status: 400 } });
  const product = await Product.findById(id).lean();
  if (!product)
    throw new Error("Product not found", { cause: { status: 404 } });
  res.json(product);
};

export const createProduct: RequestHandler = async (req, res) => {
  const {
    body: { name, description, price, categoryId },
  } = req;

  // Validate categoryId format
  if (!isValidObjectId(categoryId)) {
    throw new Error("Invalid categoryId", { cause: { status: 400 } });
  }

  // Check if category exists: it is required
  const categoryExists = await Category.exists({ _id: categoryId });
  if (!categoryExists) {
    throw new Error("Category required", { cause: { status: 404 } });
  }

  //Create product
  const product = await Product.create({
    name,
    description,
    price,
    categoryId,
  });

  res.status(201).json(product);
};

export const updateProduct: RequestHandler = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;
  //console.log("body,", body);
  if (!isValidObjectId(id))
    throw new Error("Invalid id", { cause: { status: 400 } });

  const categoryExists = await Category.exists({ _id: body.categoryId });

  if (!categoryExists)
    throw new Error("Category does not exist", {
      cause: { status: 400 },
    });

  const product = await Product.findByIdAndUpdate(id, body, {
    new: true,
  }).lean();
  if (!product)
    throw new Error("Product not found", { cause: { status: 404 } });
  res.json(product);
};

export const deleteProduct: RequestHandler = async (req, res) => {
  const {
    params: { id },
  } = req;
  if (!isValidObjectId(id))
    throw new Error("Invalid id", { cause: { status: 400 } });
  const product = await Product.findByIdAndDelete(id);
  if (!product)
    throw new Error("Product not found", { cause: { status: 404 } });
  res.json({ message: "Product deleted" });
};
