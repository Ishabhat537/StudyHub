const Material = require("../models/MaterialModel");
const cloudinary = require("../config/cloudinary");

module.exports.getMyUploads=async(req,res)=>{
    try{
         const materials=await Material.find({
     uploadedBy:req.user.id

 }).populate("uploadedBy");

 res.json({success:true,materials})

    }catch(err){
        console.log(err);
    }

}