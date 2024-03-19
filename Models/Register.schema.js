import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    userName:String,
    email:String,
    PhoneNumber:{type:Number},
    password:String,
    resetToken: String
})
const registerUser = mongoose.model("registerUser",registerSchema)
export default registerUser;