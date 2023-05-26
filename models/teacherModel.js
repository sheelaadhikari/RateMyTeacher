import mongoose from "mongoose";
const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    photo: {
        type: Buffer,
        contentType: String,
        required: true,
    },
    rating: {
        type: Number,
        rquired: true,
        default: 0,
    },
    bio: {
        type: String,
        required: true,
    },

}, { timestamps: true });
export default mongoose.model('Teachers', teacherSchema);