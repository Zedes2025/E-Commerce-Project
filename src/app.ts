import express from "express";
import cors from "cors";
import "#db";
import {
  userRoutes,
  productRoutes,
  categoryRoutes,
  orderRoutes,
} from "#routes";
// import { formidable } from 'formidable';

const app = express();
const port = process.env.PORT || 1781;
app.use((req, res, next) => {
  next();
});

app.use(cors());

app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

// app.use('*splat', notFoundHandler);

// app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server is running on port http://localhost:${port}`),
);
