import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import express from 'express';
import { createTeacherController } from "../controller/teacherController.js";
import formidable from 'express-formidable';





const router = express.Router();

//routes
router.post('/create-teacher', requireSignIn, isAdmin, formidable(), createTeacherController);
export default router;