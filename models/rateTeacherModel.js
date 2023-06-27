import mongoose from "mongoose";
const rateTeacherSchema = new mongoose.Schema({
    id: {
        type: Number,

    },
    // funnynessValue: {
    //     type: Number,

    // },
    // teachingStyleValue: {
    //     type: Number,

    // },
    // strictnessValue: {
    //     type: Number,

    // },
    // punctualityValue: {
    //     type: Number,

    // },
    // interactivityValue: {
    //     type: Number,

    // },
    // assignmentValue: {
    //     type: Number,

    // },
    // appearanceValue: {
    //     type: Number,

    // },
    teacher: {
        type: mongoose.ObjectId,
        ref: 'Teachers',
        required: true,

    },
    user: {
        type: mongoose.ObjectId,
        ref: 'users',
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    }


});
export default mongoose.model('rateTeacher', rateTeacherSchema);