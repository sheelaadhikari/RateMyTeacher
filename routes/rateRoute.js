import express from "express";

import { getRatingsByTeacherId, rateTeacherController } from "../controller/rateTeacherController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();


//rate teacher
router.post("/rate-teacher", requireSignIn, rateTeacherController);


//get ratings by teacher id

router.get("/teacher/:teacher_id/ratings", requireSignIn, getRatingsByTeacherId);


export default router;
