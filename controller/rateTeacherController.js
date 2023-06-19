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
        const ratings = await rateTeacherModel.find({
            teacher: req.params.teacher_id,
        });

        //punctuality
        let punctualitySum = 0;
        let punctualityCount = 0;
        //teachingStyle
        let teachingStyleSum = 0;
        let teachingStyleCount = 0;
        //funnyness
        let funnynessSum = 0;
        let funnynessCount = 0;
        //ineteractivity
        let interactivitySum = 0;
        let interactivityCount = 0;
        //strictness
        let strictnessSum = 0;
        let strictnessCount = 0;
        //assignment
        let assignmentSum = 0;
        let assignmentCount = 0;
        //appearance
        let appearanceSum = 0;
        let appearanceCount = 0;

        for (let i = 0; i < ratings.length; i++) {
            if (ratings[i].punctualityValue !== undefined) {
                punctualitySum = punctualitySum + ratings[i].punctualityValue;
                punctualityCount = punctualityCount + 1;
            }

            if (ratings[i].teachingStyleValue !== undefined) {
                teachingStyleSum = teachingStyleSum + ratings[i].teachingStyleValue;
                teachingStyleCount = teachingStyleCount + 1;
            }

            if (ratings[i].funnynessValue !== undefined) {
                funnynessSum = funnynessSum + ratings[i].funnynessValue;
                funnynessCount = funnynessCount + 1;
            }
            if (ratings[i].interactivityValue !== undefined) {
                interactivitySum = interactivitySum + ratings[i].interactivityValue;
                interactivityCount = interactivityCount + 1;
            }

            if (ratings[i].strictnessValue !== undefined) {
                strictnessSum = strictnessSum + ratings[i].strictnessValue;
                strictnessCount = strictnessCount + 1;
            }

            if (ratings[i].assignmentValue !== undefined) {
                assignmentSum = assignmentSum + ratings[i].assignmentValue;
                assignmentCount = assignmentCount + 1;
            }
            if (ratings[i].appearanceValue !== undefined) {
                appearanceSum = appearanceSum + ratings[i].appearanceValue;
                appearanceCount = appearanceCount + 1;
            }

            // const rating = ratings[i]["funnynessValue"] || ratings[i]["teachingStyleValue"] || ratings[i]["strictnessValue"] || ratings[i]["interactivityValue"]
            //     || ratings[i]["punctualityValue"] || ratings[i]["assignmentValue"] || ratings[i]["appearanceValue"] || 0;
            // sum = sum + rating;
        }
        let punctualityAverage = (punctualitySum / punctualityCount) || 0;
        let teachingStyleAverage = (teachingStyleSum / teachingStyleCount) || 0;
        let funnynessAverage = (funnynessSum / funnynessCount) || 0;
        let interactivityAverage = (interactivitySum / interactivityCount) || 0;
        let strictnessAverage = (strictnessSum / strictnessCount) || 0;
        let assignmentAverage = (assignmentSum / assignmentCount) || 0;
        let appearanceAverage = (appearanceSum / appearanceCount) || 0;

        let noOfRatingType =
            (!!punctualityAverage ? 1 : 0) +
            (!!teachingStyleAverage ? 1 : 0) +
            (!!funnynessAverage ? 1 : 0) +
            (!!interactivityAverage ? 1 : 0) +
            (!!strictnessAverage ? 1 : 0) +
            (!!appearanceAverage ? 1 : 0) +
            (!!assignmentAverage ? 1 : 0);

        const sumOfAverage = (punctualityAverage +
            teachingStyleAverage +
            funnynessAverage +
            interactivityAverage +
            strictnessAverage +
            assignmentAverage +
            appearanceAverage);

        let averageValue =
            ratings.length === 0
                ? 0
                : sumOfAverage / noOfRatingType;
        res.status(200).send({
            success: true,
            message: "teacher ratings",
            ratings: {
                overall: averageValue,
                punctualityAverage,
                funnynessAverage,
                teachingStyleAverage,
                strictnessAverage,
                interactivityAverage,
                assignmentAverage,
                appearanceAverage,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "something went wrong",
            error: error.message,
        });
    }
};
