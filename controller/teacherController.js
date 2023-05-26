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
                return res.status(500).send({ error: "Name is Required" });


            case !subject:
                return res.status(500).send({ error: "Subject is Required" });
            case !bio:
                return res.status(500).send({ error: "Bio is Required" });
            case photo && photo.size > 100000:
                return res
                    .status(500)
                    .send({ error: "Photo is required and should be less than 1 mb" });
        }

        const teachers = new teacherModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            teachers.photo.data = fs.readFileSync(photo, path);
            teachers.contentType = photo.type;
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
