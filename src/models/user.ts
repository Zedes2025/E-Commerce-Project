import { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // normalize email
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default model("User", userSchema);
