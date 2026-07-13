import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import  Login  from "../pages/Login";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from '../config';
function UploadMaterial() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [file, setFile] = useState("");
  const [course,setCourse]=useState("");
  const [type,setType]=useState("");
  const [year,setYear]=useState("");
  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const checkUser=async()=>{
      try{
          const response=await axios.get(`${API}/verify`,{
    withCredentials:true
  });
  setUser(response.data.user);


      }catch(err){
        console.log(err);

      }finally{
        setLoading(false);
      }
    }
    checkUser();
  },[]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("subject", subject);
      formData.append("semester", semester);
      formData.append("course",course);
      formData.append("type",type);
      formData.append("year",year);
      formData.append("file", file);

      const response = await axios.post(
        `${API}/upload`,
        formData,
        {withCredentials:true}
      );
      toast.success("Uploaded successfully!");
      console.log(response.data);
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };

   if(loading){
   return (<h2>loading...</h2>);
 }
  return (
    <>
     <div className="container py-5 d-flex justify-content-center">
      
{user?(
      <div
      className="card shadow p-4"
      style={{ width: "35rem", borderRadius: "15px" }}
    >
      <h2 className="text-center mb-4">
        Upload Study Material
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Enter description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter subject"
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Semester</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter semester"
            onChange={(e) => setSemester(e.target.value)}
          />
        </div>
        <div className="mb-3">
  <label className="form-label">Course</label>
  <select
    className="form-select"
    value={course}
    onChange={(e) => setCourse(e.target.value)}
  >
    <option value="">Select Course</option>
    <option value="BE">BE</option>
  </select>
</div>
        <div className="mb-3">
  <label className="form-label">Type</label>
  <select
    className="form-select"
    value={type}
    onChange={(e) => setType(e.target.value)}
  >
    <option value="">Select Type</option>
    <option value="Notes">Notes</option>
    <option value="PYQ">PYQ</option>
    <option value="Assignment">Assignment</option>
  </select>
</div>
<div className="mb-3">
  <label className="form-label">Year</label>
  <input
    type="number"
    className="form-control"
    value={year}
    onChange={(e) => setYear(e.target.value)}
  />
</div>
        <div className="mb-4">
          <label className="form-label">
            Upload File
          </label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
        >
          Upload Material
        </button>
      </form>
    </div>
 

): (
  <><Navigate to="/login"/></>
)}
 </div>
    </>
  );
}

export default UploadMaterial;
