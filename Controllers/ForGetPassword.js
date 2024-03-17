import mail from "../Services/nodemailer.js"
import registerUser from "../Models/Register.schema.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";

//function for forget password
export const forGetPassword = async(req,res)=>{
    const {email}=req.body // receiving email in body 
    try {
        const user = await registerUser.findOne({ email }); // finding email from db collection
        if (!user) { 
          return res.status(401).json({ msg: "please Enter a Valid Email" });
        }
        const result = await mail(email) // using mail function to send mail
        res.status(200).json({msg:"please check your mail",result}); // Send response after receiving result
    } catch (error) {
        console.error('Error sending reset token:', error);
        res.status(500).json({ error: 'Failed to send reset token to email' });
    }
}
//password reset function 
export const passwordReset = async (req, res) => {
    const { email, newPassword, conformPassword } = req.body; //receiving needed keys from body 
    try {
        const user = await registerUser.findOne({ email }); // finding email from db collection
        if (!user) {
            return res.status(404).send("User not found");
        }
        //conditions for password
        if (newPassword !== conformPassword || newPassword === "" || conformPassword === "") {
            return res.status(400).json({msg:"New password and confirm password do not match"});
        }
        //using mail function to send email with reset token
        const success = await mail(email); 
        if (!success) {
            return res.status(500).send("Failed to send reset token to email");
        }
        //using bcrypt to make hashed password
        const hashedPassword = await bcrypt.hash(newPassword, 8);
        // writing query to update in db collection
        await registerUser.updateOne(
            { email },
            { password: hashedPassword, randomString: 1 }
        );
        //update response msg
        res.status(200).json({msg:"Password updated successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Internal Server Error",
            error: error.message,
        });
    }
};

