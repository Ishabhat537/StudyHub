const mongoose=require("mongoose");

const MaterialSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    subject:{
        type:String
    },
    semester:{
        type:String
    },
    course:{
        type:String
    },
    year:{
        type:Number
    },
    type:{
        type:String
    },
    fileUrl:{
        type:String
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    favourites:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },],
    viewCount:{
        type:Number,
       default:0
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        },
    ],

     downloads:{
        type:Number,
        default:0
     }
    
},{
    timestamps:true
});

module.exports=mongoose.model("Material",MaterialSchema);