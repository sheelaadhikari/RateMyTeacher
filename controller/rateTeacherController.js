import rateTeacherModel from "../models/rateTeacherModel.js";
import teacherModel from "../models/teacherModel.js";
// rating teacher
export const rateTeacherController = async (req, res) => {
  try {
    const teacher = req.body.teacher;
    const user = req.user._id;
    const category = req.body.category;
    const value = req.body.value;

    // console.log(req.body);
    // console.log(req.user._id);

    //validation

    // if (!teacher)
    //     return res.status(400).send({ error: "teacher is required" });

    // if (!user) return res.status(400).send({ error: "user is required" });

    //save it

    const existingRating = await rateTeacherModel.findOne({
      teacher: teacher,
      category: category,
      user: user,
    });
    console.log("the existing Ratings are", existingRating);

    let savedRating;
    if (existingRating) {
      savedRating = await existingRating.updateOne({ value: req.body.value });
    } else {
      const rate = new rateTeacherModel({
        teacher: teacher,
        user: user,
        category: category,
        value: value,
        // rateValue: rateValue,
      });

      savedRating = await rate.save();
    }
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
    console.log(ratings);

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
      if (ratings[i].category === "punctuality") {
        punctualitySum = punctualitySum + ratings[i].value;
        punctualityCount = punctualityCount + 1;
      }
      if (ratings[i].category === "strictness") {
        strictnessSum = strictnessSum + ratings[i].value;
        strictnessCount = strictnessCount + 1;
      }
      if (ratings[i].category === "teachingStyle") {
        teachingStyleSum = teachingStyleSum + ratings[i].value;
        teachingStyleCount = teachingStyleCount + 1;
      }
      if (ratings[i].category === "funnyness") {
        funnynessSum = funnynessSum + ratings[i].value;
        funnynessCount = funnynessCount + 1;
      }
      if (ratings[i].category === "interactivity") {
        interactivitySum = interactivitySum + ratings[i].value;
        interactivityCount = interactivityCount + 1;
      }
      if (ratings[i].category === "appearance") {
        appearanceSum = appearanceSum + ratings[i].value;
        appearanceCount = appearanceCount + 1;
      }
      if (ratings[i].category === "assignment") {
        assignmentSum = assignmentSum + ratings[i].value;
        assignmentCount = assignmentCount + 1;
      }

      // if (ratings[i].teachingStyleValue !== undefined) {
      //     teachingStyleSum = teachingStyleSum + ratings[i].teachingStyleValue;
      //     teachingStyleCount = teachingStyleCount + 1;
      // }
    }
    let punctualityAverage = punctualitySum / punctualityCount || 0;
    let teachingStyleAverage = teachingStyleSum / teachingStyleCount || 0;
    let funnynessAverage = funnynessSum / funnynessCount || 0;
    let interactivityAverage = interactivitySum / interactivityCount || 0;
    let strictnessAverage = strictnessSum / strictnessCount || 0;
    let assignmentAverage = assignmentSum / assignmentCount || 0;
    let appearanceAverage = appearanceSum / appearanceCount || 0;

    let noOfRatingType =
      (!!punctualityAverage ? 1 : 0) +
      (!!teachingStyleAverage ? 1 : 0) +
      (!!funnynessAverage ? 1 : 0) +
      (!!interactivityAverage ? 1 : 0) +
      (!!strictnessAverage ? 1 : 0) +
      (!!appearanceAverage ? 1 : 0) +
      (!!assignmentAverage ? 1 : 0);

    const sumOfAverage =
      punctualityAverage +
      teachingStyleAverage +
      funnynessAverage +
      interactivityAverage +
      strictnessAverage +
      assignmentAverage +
      appearanceAverage;

    let averageValue = ratings.length === 0 ? 0 : sumOfAverage / noOfRatingType;
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

// get my ratings

export const getMyRatingsByTeacherId = async (req, res) => {
  try {
    const ratings = await rateTeacherModel.find({
      teacher: req.params.teacher_id,
      user: req.user._id,
    });
    console.log(ratings);

    res.status(200).send({
      success: true,
      message: "my teacher ratings",
      ratings: ratings,
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

export const getALLTeachersRatingsController = async (req, res) => {
  try {
    const allTeachersRatings = await rateTeacherModel
      //   .populate("teacher")
      .aggregate()
      .group({
        _id: "$teacher",
        allRatings: {
          $push: {
            value: "$value",
            category: "$category",
          },
        },
        // teacherId: "$teacher",
        overallRating: { $avg: "$value" },
      })
      .lookup({
        from: "teachers",
        localField: "_id",
        foreignField: "_id",
        as: "teacher",
      });

    console.log(allTeachersRatings);
    res.status(200).send({
      success: true,
      message: "list of teacher and ratings",
      ratings: allTeachersRatings,
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
