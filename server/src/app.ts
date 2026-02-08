import express from "express";
import userRouter from "./routes/userRoute.js";
import handleError from "./middlewares/error.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/v1", userRouter);

app.use(handleError);

export default app;
