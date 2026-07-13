const mongoose=require("mongoose");
const reviewSchema=mongoose.Schema({
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    material: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Material",
},

user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
},
    createdAt:{
        type:Date,
        default:Date.now()
    }
});
module.exports=mongoose.model("Review",reviewSchema);