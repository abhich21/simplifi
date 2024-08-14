import express from "express";
import { userRegister } from "../controllers/User.js";

const router = express.Router();
router.post("/signup", userRegister);

export default router;