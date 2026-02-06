import express from "express";
import userRouter from "./routes/userRoute.js";
import handleError from "./middlewares/error.ts";

const app = express();

app.use(express.json());

//Routes
app.use("/api/v1", userRouter);

app.use(handleError);

export default app;
