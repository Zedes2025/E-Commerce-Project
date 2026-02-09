import express from "express";
import cors from "cors";
import "#db";

// import { formidable } from 'formidable';

const app = express();
const port = process.env.PORT || 1001;
app.use((req, res, next) => {
  console.log("Are you there?");
  next();
});

app.use(cors());

app.use(express.json());

// app.use('/users', userRouter);

// app.use('*splat', notFoundHandler);

// app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server is running on port http://localhost:${port}`),
);
