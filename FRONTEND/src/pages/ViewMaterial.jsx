import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

function ViewMaterial() {
  const { id } = useParams();

  const [material, setMaterial] = useState(null);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/materials/${id}`);

        setMaterial(res.data.material);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMaterial();
  }, [id]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (!material) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container mt-4">
      <h2>{material.title}</h2>

      <div className="d-flex flex-column align-items-center gap-4">
        <Document
          file={{ url: material.fileUrl }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from({ length: numPages }, (_, index) => (
            <Page
              key={index}
              pageNumber={index + 1}
              width={800}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
        </Document>
      </div>

      <div className="col-8 gap-4">
        <h2>Leave a review</h2>
        <form action="">
          <label for="rating" className="form-label">Rating</label>
          <input
            type="range"
            min="1"
            max="5"
            id="rating"
            name="review[rating]"
            className="form-range"
          />
          <br />

          <label for="comment" className="form-label">Comment</label> <br />
          <textarea
            name="review[comment]"
            id="comment"
            cols={30}
            rows={5}
              
            className="form-control"
          ></textarea>
          <br />

          <button className="btn btn-outline-dark">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ViewMaterial;
