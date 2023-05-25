import mongoose from "mongoose";
const teacherSchema = new mongooseSchema({
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
    },
    bio: {
        type: String,
        required: true,
    },

}, { timestamps: true });
export default mongoose.model('Teachers', teacherSchema);