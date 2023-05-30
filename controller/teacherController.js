import fs from "fs";
import teacherModel from "../models/teacherModel.js";
import slugify from "slugify";

export const createTeacherController = async (req, res) => {
    try {
        const { name, slug, subject, bio } = req.fields;
        const { photo } = req.files;
        //validation
        switch (true) {
            case !name:
                return res.status(400).send({ error: "Name is Required" });

            case !subject:
                return res.status(400).send({ error: "Subject is Required" });
            case !bio:
                return res.status(400).send({ error: "Bio is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(400)
                    .send({ error: "Photo is required and should be less than 1 mb" });
        }

        const teachers = new teacherModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            teachers.photo.data = fs.readFileSync(photo.path);
            teachers.photo.contentType = photo.type;
        }
        await teachers.save();
        res.status(201).send({
            success: true,
            message: "teachers created successfully",
            teachers,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "something went worng",
            error,
        });
    }
};

//get all teachers
export const getTeacherController = async (req, res) => {
    try {
        const teachers = await teacherModel
            .find({})
            .populate("_id")
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(200).send({
            countTotal: teachers.length,
            success: true,
            message: "all teachers",
            teachers,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in getting  all teacher",
            error: error.message,
        });
    }
};

// get single teacher

export const getSingleTeacherController = async (req, res) => {
    try {
        const teacher = await teacherModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("_id");
        if (teacher) {
            res.status(200).send({
                success: true,
                message: " single teacher fetched",
                teacher,
            });
        } else {
            res.status(404).send({
                success: false,
                message: "teacher not found",
                teacher,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while getting single teacher",
            error,
        });
    }
};

// get teacher photo
export const teacherPhotoController = async (req, res) => {
    try {
        const teacher = await teacherModel.findById(req.params._id).select("photo");
        if (teacher.photo.data) {
            res.set("Content-type", teacher.photo.contentType);
            return res.status(200).send(teacher.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while getting photo of teacher",
            error,
        });
    }
};

// delete teacher
export const deleteTeacherController = async (req, res) => {
    try {
        console.log(req.params._id);
        await teacherModel.findByIdAndDelete(req.params._id).select("-photo");

        res.status(200).send({
            success: true,
            message: "deleted teacher successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while deleting teacher",
            error,
        });
    }
};
//update teacher
export const updateTeacherController = async (req, res) => {
    try {
        const { name, slug, subject, bio } = req.fields;
        const { photo } = req.files;
        //validation
        switch (true) {
            case !name:
                return res.status(400).send({ error: "Name is Required" });

            case !subject:
                return res.status(400).send({ error: "Subject is Required" });
            case !bio:
                return res.status(400).send({ error: "Bio is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(400)
                    .send({ error: "Photo is required and should be less than 1 mb" });
        }

        const teachers = await teacherModel.findByIdAndUpdate(
            req.params._id,
            {
                ...req.fields,
                slug: slugify(name),
            },
            { new: true }
        );
        if (photo) {
            teachers.photo.data = fs.readFileSync(photo.path);
            teachers.photo.contentType = photo.type;
        }
        await teachers.save();
        res.status(201).send({
            success: true,
            message: "teachers updated successfully",
            teachers,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "something went worng",
            error,
        });
    }
};
