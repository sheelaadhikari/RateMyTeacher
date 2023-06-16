import express from "express";

import { getRatingsByTeacherId, rateTeacherController } from "../controller/rateTeacherController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();


//get teachers
router.post("/rate-teacher", requireSignIn, rateTeacherController);


//get all ratings

router.get("/teacher/:id/ratings", requireSignIn, getRatingsByTeacherId);


export default router;
