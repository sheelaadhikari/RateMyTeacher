import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import express from "express";
import { userListController } from "../controller/authController.js";
const router = express.Router();




//get users
router.get("/get-users", userListController);
export default router;