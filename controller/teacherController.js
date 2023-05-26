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
        const teachers = await teacherModel.find({}).select("-photo").limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            countTotal: teachers.length,
            success: true,
            message: "all teachers",
            teachers,
        })


    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in getting teacher",
            error: error.message,

        });

    }

};




export const getSingleTeacherController = async (req, res) => { };
