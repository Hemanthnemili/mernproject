import express from "express";
import { updateUser } from "../controllers/userController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);

export default router;
