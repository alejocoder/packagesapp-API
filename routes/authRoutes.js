import  express from "express";
import { RegisterUser, loginUser } from "../controllers/authController.js";

const router = express.Router();


router.post("/login", loginUser);
router.post("/register", RegisterUser);

export default router;