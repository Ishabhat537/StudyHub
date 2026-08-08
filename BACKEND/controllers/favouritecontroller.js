const Material = require("../models/MaterialModel");
const cloudinary = require("../config/cloudinary");

module.exports.toggleFavourite = async (req, res) => {

  try {

    const material = await Material.findById(
      req.params.id
    );

    if (!material) {

      return res.status(404).json({
        success: false,
      });

    }

    const userId = req.user.id;

    const alreadyLiked =
      material.favourites.includes(userId);

    const updatedMaterial =
      await Material.findByIdAndUpdate(

        req.params.id,

        alreadyLiked
          ? {
              $pull: {
                favourites: userId,
              },
            }
          : {
              $push: {
                favourites: userId,
              },
            },

       { returnDocument: "after" }

      );

    res.status(200).json({
      success: true,
      favourites:
        updatedMaterial.favourites,
    });

  } catch (err) {

    console.log(err);

  }

};


module.exports.getFavourites=async(req,res)=>{
  try{
    const userId=req.user.id;
    const materials=await Material.find({
      favourites:userId,

    }).populate("uploadedBy","username");
    console.log(materials);

    res.status(200).json(
      {
        materials,
        userId
      }
    );


  }catch(err){
    res.status(500).json({
      message:err.message,
    });

  }
}