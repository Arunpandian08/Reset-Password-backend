import bcrypt from "bcryptjs/dist/bcrypt.js";
import registerUser from "../Models/Register.schema.js";
import bcryptjs from "bcryptjs";

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await registerUser.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "please Enter a Valid Email" });
    }
    const matchingPassword = await bcrypt.compare(password, user.password);
    if (!matchingPassword) {
      return res.status(401).json({ msg: "Please Enter a Valid Password" });
    }
    res.status(200).json({ msg: "Login Successful" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server error" });
  }
};
