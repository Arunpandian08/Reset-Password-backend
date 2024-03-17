import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

const connectDB = async()=>{
    const mongodbURL = process.env.MONGODBCONNECTIONSTRING
    try {
        const connection = await mongoose.connect(mongodbURL)
        console.log("Connected with MongoDB");
        return connection;
    } catch (error) {
        console.log("Not Connected with MongoDB",error);
    }
}
export default connectDB;