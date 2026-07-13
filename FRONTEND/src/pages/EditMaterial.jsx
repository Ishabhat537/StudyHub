import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
function EditMaterial() {
    const {id}=useParams();
    const navigate=useNavigate();
    const [material,setMaterial]=useState({
        title:"",
        description:"",
        subject:"",
        semester:""
    });

    const [file,setFile]=useState(null);
    useEffect(()=>{
        const fetchMaterial=async()=>{
            try{
               const res= await axios.get( `http://localhost:3000/materials/${id}`,{
                   withCredentials:true,
                });
                console.log(res.data);
                setMaterial(res.data.material);
            }catch(err){
                    console.log(err);
            }
        }
        fetchMaterial();
    },[id]);

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setMaterial({
           ...material,
           [name]:value,
        });
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const formData=new FormData();
            formData.append("title",material.title);
             formData.append("description", material.description);
      formData.append("subject", material.subject);
      formData.append("semester", material.semester);

       if (file) {

        formData.append("file", file);

      }

        await axios.put(
        `http://localhost:3000/materials/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
toast.success("Updated successfully!");

      setTimeout(()=>{
        navigate("/myuploads");
      },1500);


        }catch(err){
            console.log(err);
            toast.error("Failed to update");

        }


    }

     return (
    <div className="container mt-5">
<ToastContainer

 position="top-right"
  autoClose={1500}
  hideProgressBar={false}
  closeOnClick
  pauseOnHover
  theme="colored"/>
      <h1>Edit Material</h1>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">

          <label>Title</label>

          <input
            type="text"
            className="form-control"
            name="title"
            value={material.title}
            onChange={handleChange}
          />

        </div>

        <div className="mb-3">

          <label>Description</label>

          <textarea
            className="form-control"
            name="description"
            value={material.description}
            onChange={handleChange}
          />

        </div>

        <div className="mb-3">

          <label>Subject</label>

          <input
            type="text"
            className="form-control"
            name="subject"
            value={material.subject}
            onChange={handleChange}
          />

        </div>

        <div className="mb-3">

          <label>Semester</label>

          <input
            type="number"
            className="form-control"
            name="semester"
            value={material.semester}
            onChange={handleChange}
          />

        </div>

        <div className="mb-3">

          <label>Replace File</label>

          <input
            type="file"
            className="form-control"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Update Material
        </button>

      </form>
      

</div>
     )
}
     

export default EditMaterial;