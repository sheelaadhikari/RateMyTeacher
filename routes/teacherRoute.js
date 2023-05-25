import { isAdmin, requireSignIn } from "../middlewares/authMiddleware";
import express from express;
import { createTeacherController } from "../controller/teacherController";




const router = express.Router();

//routes
router.post('/create-teacher', requireSignIn, isAdmin, createTeacherController);
export default router;