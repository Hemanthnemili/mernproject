import express from "express";
import mongoose from "mongoose";

const app = express();

const mongo =
  "mongodb+srv://test1:test111@project.zzshlyu.mongodb.net/project?retryWrites=true&w=majority";

mongoose
  .connect(mongo)
  .then(() => console.log("connected"))
  .catch((e) => console.log(e.message));

app.listen(5000, () => {
  console.log("listening on port");
});
