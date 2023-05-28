import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import express from 'express';
import { createTeacherController, getSingleTeacherController, getTeacherController } from "../controller/teacherController.js";
import formidable from 'express-formidable';





const router = express.Router();

//routes
router.post('/create-teacher', requireSignIn, isAdmin, formidable(), createTeacherController);


//get teachers
router.get('/get-teacher', getTeacherController);

// get single teacher
router.get('/get-teacher/:slug', getSingleTeacherController);


export default router;