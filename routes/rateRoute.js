import express from "express";

import { getAllRatingController, rateTeacherController } from "../controller/rateTeacherController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();


//get teachers
router.post("/rate-teacher", requireSignIn, rateTeacherController);


//get all ratings

router.get("/getAllRating-teacher", requireSignIn, getAllRatingController);


export default router;
