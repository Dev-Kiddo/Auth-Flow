import express from "express";
import userRouter from "./routes/userRoute.js";
import handleError from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { METHODS } from "node:http";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PATCH"],
    allowHeaders: ["Content-Type"],
    credentials: true,
  }),
);

//Routes
app.use("/api/v1", userRouter);

app.use(handleError);

export default app;
