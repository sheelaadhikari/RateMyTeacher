import express from "express";
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware';
const router = express.Router();
//router
router.post('create-category', requireSignIn, isAdmin, createCategoryController);
export default router;