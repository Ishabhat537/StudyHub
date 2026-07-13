require("dotenv").config();
const express=require("express");
const mongoose = require("mongoose");
const cors=require("cors");
const { Signup } = require("./controllers/authController");
const authRoute=require("./routes/authRoute");
const materialRoute=require("./routes/materialRoute");
const myUploadsRoute=require("./routes/myUploadsRoute");
const cookieParser = require("cookie-parser");
const toggleFavouriteRoute  = require("./routes/toggleFavouriteRoute");

const app=express();

app.use(express.json());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());
app.use("/",authRoute);
app.use("/",materialRoute);
app.use("/",myUploadsRoute);
app.use("/",toggleFavouriteRoute);

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB connected"))
.catch((err)=>console.log(err));

app.get("/",async(req,res)=>{
    res.send("api working");
});
const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server listening to port ${PORT}`)
});