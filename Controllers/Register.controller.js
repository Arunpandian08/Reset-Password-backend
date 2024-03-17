import bcrypt from "bcryptjs/dist/bcrypt.js";
import registerUser from "../Models/Register.schema.js";

//function for creating users details and save it in db collection
export const postRegister = async (req, res) => {
  try {
    //destructured data receive from body
    const { userName, email, phoneNumber, password } = req.body;
    //using bcrypt for password decrypt as a hashed password
    const hashedPassword = await bcrypt.hash(password, 8); 
    console.log("hashedPassword", hashedPassword);
    const register = new registerUser({
      userName,
      email,
      phoneNumber,
      password: hashedPassword,
    });
    await register.save();
    res.status(200).json({ msg: "Registered Successful", data: register });
  } catch (error) {
    res.status(500).json({ msg: "internal Server Error" });
  }
};


