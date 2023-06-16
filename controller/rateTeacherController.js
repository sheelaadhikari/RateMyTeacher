import rateTeacherModel from "../models/rateTeacherModel.js";
import teacherModel from "../models/teacherModel.js";
// rating teacher
export const rateTeacherController = async (req, res) => {
    try {
        const teacher = req.body.teacher;
        const user = req.user._id;
        const type = req.body.type;
        const rateValue = req.body.rateValue;

        // console.log(req.body);
        // console.log(req.user._id);
        console.log(rateValue);



        //validation

        // if (!teacher)
        //     return res.status(400).send({ error: "teacher is required" });

        // if (!user) return res.status(400).send({ error: "user is required" });





        //save it
        const rate = new rateTeacherModel({
            teacher: teacher,
            user: user,
            [type]: rateValue,
            // rateValue: rateValue,
        });
        const savedRating = await rate.save();
        res.status(201).send({
            success: true,
            message: "rating done",
            rate: savedRating,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "something went wrong",
            error,
        });
    }
};






//get all ratings 
export const getRatingsByTeacherId = async (req, res) => {
    try {
        const ratings = await rateTeacherModel.find({}).select("");
        console.log(ratings);
        res.status(200).send({
            success: true,
            message: "all teacher ratings",
            ratings,
        })



    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "something went wrong",
            error: error.message,
        })
    }

};
