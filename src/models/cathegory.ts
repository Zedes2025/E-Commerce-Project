import { Schema, model } from "mongoose";

const cathegorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default model("Cathegory", cathegorySchema);
