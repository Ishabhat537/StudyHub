

const User = require("../models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.json({
        success: false,
        message: "All fields are required!",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      isVerified: true
    });

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully!",
      user,
    });

  } catch (err) {
    console.error("Signup Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
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


// module.exports.SendOtp=async(req,res)=>{
//   try{
//     const {email,username,password}=req.body;
//     if(!email || !username || !password){
//       return res.json({
//         success:false,
//         message:"All field are required",
//       });
//     }
//     if(!email.endsWith("@ldce.ac.in")){
//       return res.json({
//         success:false,
//         message:"Only college email addresses are allowed!",
//       });
//     }
//     const existingUser=await User.findOne({email});
//     if(existingUser){
//       return res.json({
//         success:false,
//         message:"User already exists!",
//       });
//     }
//     await OtpModel.deleteMany({email});

//     const hashedPassword=await bcrypt.hash(password,10);

//     const otp=Math.floor(100000 + Math.random() * 900000).toString();

//     await OtpModel.create({
//       email,
//       username,
//       password:hashedPassword,
//       otp,
//       expiresAt: new Date(Date.now() + 5 * 60 * 1000),
//     });

//     await transporter.sendMail({
//       from:process.env.EMAIL_USER,
//       to:email,
//       subject:"Studyhub Email Verification",
//       text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
//     });
//     return res.json({
//       success:true,
//       message:"OTP sent successfully!",
//     });

//   }catch (err) {
//   console.log("SendOtp Error:", err);

//   return res.status(500).json({
//     success: false,
//     message: err.message,
//   });
// }
// }



module.exports.Logout=async(req,res)=>{
  res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "None",
});
  res.json({success:"true",message:"Logged you out!"});

}
