import express from "express";

import { getMyRatingsByTeacherId, getRatingsByTeacherId, rateTeacherController, getALLTeachersRatingsController } from "../controller/rateTeacherController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();


//rate teacher
router.post("/rate-teacher", requireSignIn, rateTeacherController);


//get all ratings by teacher_id 

router.get("/teacher/:teacher_id/ratings", requireSignIn, getRatingsByTeacherId);

// get my ratings by teacher-id 
router.get("/teacher/:teacher_id/my-ratings", requireSignIn, getMyRatingsByTeacherId);


// get list of teacher and their ratings
router.get("/teacher/all-ratings", requireSignIn, getALLTeachersRatingsController);







export default router;
