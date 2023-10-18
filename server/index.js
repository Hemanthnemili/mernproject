import express from "express";
import connectDb from "../server/db/connectDb.js";
import userRouter from "../server/routes/userRoute.js";
import authRouter from "../server/routes/authRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
connectDb();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
