const Material = require("../models/MaterialModel");
const cloudinary = require("../config/cloudinary");

module.exports.uploadMaterial = async (req, res) => {
  try {
    const { title, description, subject, semester,course,type,year } = req.body;
    if (!req.file) {
      return res.json({
        success: false,
        message: "File required",
      });
    }

    const uploadedFile = await cloudinary.uploader.upload(req.file.path, {
       resource_type: "auto",
  access_mode: "public",
  use_filename: true,
  unique_filename: false,
    });
    console.log(uploadedFile);

    const material = await Material.create({
      title,
      description,
      subject,
      semester,
      course,
      type,
      year,
      fileUrl: uploadedFile.secure_url,
      uploadedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Material uploaded",
      material,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find()
      .populate("uploadedBy", "username")
      .populate("favourites", "_id");
    console.log(materials[0].favourites);
    res.status(200).json({ success: true, materials });
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteMaterials = async (req, res) => {
  try {
    const materials = await Material.findById(req.params.id);
    if (!materials) {
      return res
        .status(404)
        .json({ success: false, message: "Material not found!" });
    }
    if (materials.uploadedBy.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    await Material.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.updateMaterial = async (req, res) => {
  try {
    const materials = await Material.findById(req.params.id);
    if (!materials) {
      return res
        .status(404)
        .json({ success: false, message: "Material not found!" });
    }
    if (materials.uploadedBy.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    materials.title = req.body.title;
    materials.description = req.body.description;
    materials.subject = req.body.subject;
    materials.semester = req.body.semester;

    if (req.file) {
      const uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "raw",
        access_mode: "public",
      });

      materials.fileUrl = uploadedFile.secure_url;
    }

    await materials.save();

    res.status(200).json({
      success: true,
      message: "Material updated successfully",
      materials,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getSingleMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(req.params.id,{
      $inc:{
        viewCount:1
      }
    },{
      new:true
    });

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material not found",
      });
    }

    res.status(200).json({
      success: true,
      material,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.filterMaterials = async (req, res) => {
  try {
    const { search, semester, subject, course, year,type } = req.query;

    const filter = {};
    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          }
        },
        {
          description: {
            $regex: search,
            $options: "i",
          }
        },
        {
          subject: {
            $regex: search,
            $options: "i",
          }
        },
        {
          course: {
            $regex: search,
            $options: "i",
          },
        }
        
      ];
    }

    if (semester) {
      filter.semester = Number(semester);
    }
    if (subject) {
      filter.subject = subject;
    }
    if (course) {
      filter.course = course;
    }
    if (year) {
      filter.year = Number(year);
    }
    if(type){
      filter.type=type;
    }
    const materials = await Material.find(filter);

    res.status(200).json({
      materials,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.downloadMaterial=async(req,res)=>{
  try{
    const material=await Material.findById(req.params.id);
    if(!material){
      return res.status(404).json({
        message:"Material not found"
      });
    }
    material.downloads+=1;
    await material.save();

    res.json({
      downloadUrl:material.fileUrl,
      downloads:material.downloads
    });

  }catch(err){
    res.status(500).json({
      message:err.message
    });

  }
}
