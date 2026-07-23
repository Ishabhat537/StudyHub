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
  return(

  <div className="material-card">

    {/* PDF Preview */}
    <Link
      to={`/view/${material._id}`}
      className="material-preview"
    >
      <Document file={material.fileUrl}>
        <Page
          pageNumber={1}
          width={115}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </Link>

    {/* Material Information */}
    <div className="material-content">

      <div className="material-card-header">
        <div>
          <span className="material-type">
            {material.type || "Study Material"}
          </span>

          <h5 className="material-title">
            {material.title}
          </h5>
        </div>

        <button
          className="favourite-btn"
          onClick={handleFavourite}
          aria-label="Add to favourites"
        >
          {liked ? (
            <FaHeart size={19} className="liked-heart" />
          ) : (
            <FaRegHeart size={19} />
          )}
        </button>
      </div>

      <p className="material-description">
        {material.description?.slice(0, 75)}
        {material.description?.length > 75 && "..."}
      </p>

      {/* Tags */}
      <div className="material-tags">
        <span>{material.subject}</span>
        <span>Semester {material.semester}</span>

        {material.year && (
          <span>{material.year}</span>
        )}
      </div>

      {/* Bottom */}
      <div className="material-footer">

        <div className="material-meta">
          <span className="uploader">
            @{material.uploadedBy?.username || "student"}
          </span>

          <span>
            <FaEye /> {material.viewCount || 0}
          </span>

          <button
            className="download-btn"
            onClick={handleDownload}
            title="Download"
          >
            <FaDownload />
          </button>
        </div>

        <div className="material-actions">

          {showActions && (
            <>
              <button
                onClick={onEdit}
                className="edit-btn"
              >
                Edit
              </button>

              <button
                onClick={onDelete}
                className="delete-btn"
              >
                Delete
              </button>
            </>
          )}

          <Link
            to={`/view/${material._id}`}
            className="view-material-btn"
          >
            View
          </Link>

        </div>

      </div>
    </div>
  </div>
);
}
  

export default MaterialCard;
