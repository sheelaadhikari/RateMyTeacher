import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import express from "express";
import {
  deleteUserController,
  userListController,
} from "../controller/authController.js";
const router = express.Router();

//get users
router.get("/get-users", userListController);
// delete user
router.delete("/delete-user/:_id", deleteUserController);

export default router;
