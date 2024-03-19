import registerUser from "../Models/Register.schema.js";

export const getValidateToken = async (req, res) => {
  const resetToken = req.params.token;
  try {
    registerUser.findOne({ resetToken }).then((records) => {
      // Has records ?
      if (records && records._doc) {
        res.status(200).json({ valid: true, msg: "Valid token" });
      } else {
        res.status(200).json({valid:false, msg: "Token not found" });
      }
    });
  } catch (error) {
    res.status(404).json({ msg:"Internal Server Error "});
  }
};
