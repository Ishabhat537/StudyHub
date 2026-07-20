const User = require("../models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res) => {
  try {

    const { email, username, password, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success:false,message: "User already exists!" });
    }

    if(!email || !username || !password){
   return res.json({
      success:false,
      message:"All fields are required!"
   });
}
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      createdAt,
    });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
       httpOnly: true,
  secure: true,
  sameSite: "None",
    });

       
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
  } catch (err) {
    console.log(err);
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({success:false, message: "All fields are required!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success:false,message: "Incorrect username or password!" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({success:false, message: "Incorrect username or password!" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
       httpOnly: true,
  secure: true,
  sameSite: "None",
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports.Logout=async(req,res)=>{
  res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "None",
});
  res.json({success:"true",message:"Logged you out!"});

}
