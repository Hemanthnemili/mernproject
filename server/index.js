import express from "express";
import connectDb from "../server/db/connectDb.js";
connectDb();

const app = express();

app.listen(5000, () => {
  console.log("listening on port");
});
