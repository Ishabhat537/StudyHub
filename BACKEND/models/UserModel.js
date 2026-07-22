const mongoose=require("mongoose");
const UserSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:new Date(),
    },
        isVerified:{
            type:Boolean,
            default:false
    }
});

module.exports=mongoose.model("User",UserSchema);