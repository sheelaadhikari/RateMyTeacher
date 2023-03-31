import mongoose from 'mongoose'
import colors from 'colors'
const connectDB = async () => {
    console.log(process.env.MONGO_URL);
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);

        console.log(`Connected to Mongodb Database ${conn.connection.host}`.bgMagenta.white);

    }
    catch (error) {
        console.log(`error in mongodb ${error}`.bgRed.white)
    }
}
export default connectDB;
