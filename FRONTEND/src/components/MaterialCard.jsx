import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "../styles/materials.css";
import { FaHeart, FaRegHeart ,FaEye,FaDownload} from "react-icons/fa";
import axios from "axios";
import API from '../config';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();


function MaterialCard({ material, showActions, onEdit, onDelete, userId,viewCount }) {
  // const [liked, setLiked] = useState(false);
  //
  // useEffect(() => {
  //
  // if (userId && material?.favourites) {
  //
  // const isLiked = material.favourites.some(
  // (id) =>
  // (id._id || id).toString() ===
  // userId.toString()
  // );
  //
  // setLiked(isLiked);
  //
  // }
  //
  // }, [userId, material]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    console.log("favourites:", material.favourites);
    console.log("userId:", userId);

    const isLiked = material.favourites?.some(
      (fav) => String(fav._id || fav) === String(userId),
    );

    console.log("isLiked:", isLiked);

    setLiked(isLiked);
  }, [material.favourites, userId]);

  const handleFavourite = async () => {
    try {
      await axios.put(
        `${API}/favourite/${material._id}`,
        {},
        {
          withCredentials: true,
        },
      );

      setLiked((prev) => !prev);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const handleDownload=async()=>{
    try{
      const res=await axios.get(
        `${API}/download/${material._id}`,
        

      );
      console.log(res.data.downloadUrl);
      const url=res.data.downloadUrl.replace(
        "/upload/",
        "/upload/fl_attachment/"
      );
      

      window.open(url);

    }catch(err){
      console.log(err);

    };
  }
  return(<>

<div className="card border-0 rounded-4 shadow-sm h-100 p-3">
  <div className="d-flex align-items-start gap-3">

    <Link to={`/view/${material._id}`}>
      <div
        className="overflow-hidden rounded-3 border"
        style={{
          width: "100px",
          height: "130px",
          background: "#f8f9fa",
          flexShrink: 0,
        }}
      >
      {console.log("PDF URL:", material.fileUrl)}
        <Document file={material.fileUrl}>
          <Page
            pageNumber={1}
            width={100}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </Link>

    <div className="flex-grow-1">

      <div className="d-flex justify-content-between">
        <h5 className="fw-bold mb-2">
          {material.title}
        </h5>

        <div onClick={handleFavourite} style={{ cursor: "pointer" }}>
          {liked ? (
            <FaHeart size={20} color="#dc3545" />
          ) : (
            <FaRegHeart size={20} />
          )}
        </div>
      </div>

      <p className="text-muted small mb-2">
        {material.description?.slice(0, 60)}
      </p>

      <div className="small mb-1">
        📘 {material.subject}
      </div>

      <div className="small mb-1">
        🎓 Semester {material.semester}
      </div>

      <div className="small text-secondary mb-2">
        👤 @{material.uploadedBy?.username}
      </div>

      <div className="d-flex justify-content-between align-items-center mt-2">
        <span className="text-secondary">
          <FaEye /> {material.viewCount || 0}
        </span>
        <span className="text-secondary" onClick={handleDownload}>
          <FaDownload/> 
        </span>
        {showActions && (
  <>
    <button onClick={onEdit} className="btn btn-warning btn-sm">Edit</button>
    <button onClick={onDelete} className="btn btn-danger btn-sm">Delete</button>
  </>
)}

        <Link
          to={`/view/${material._id}`}
          className="btn btn-primary btn-sm"
        >
          View PDF
        </Link>
      </div>

    </div>

  </div>
</div>
  </>)
}
export default MaterialCard;
