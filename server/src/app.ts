import express from "express";
import userRouter from "./routes/userRoute.js";

const app = express();

app.use(express.json());

//Routes
app.use("/api/v1", userRouter);

export default app;
