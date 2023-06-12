import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import express from "express";
import {
    createTeacherController,
    deleteTeacherController,
    getSingleTeacherController,
    getTeacherController,
    teacherPhotoController,
    updateTeacherController,
} from "../controller/teacherController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
    "/create-teacher",
    requireSignIn,
    isAdmin,
    formidable(),
    createTeacherController
);

//get teachers
router.get("/get-teacher", getTeacherController);

// get single teacher
router.get("/get-teacher/:slug", getSingleTeacherController);

// get teacher photo
router.get("/teacher-photo/:_id", teacherPhotoController);

// delete teacher
router.delete("/delete-teacher/:_id", deleteTeacherController);

//update teacher
router.put(
    "/update-teacher/:_id",
    requireSignIn,
    isAdmin,
    formidable(),
    updateTeacherController
);

export default router;
