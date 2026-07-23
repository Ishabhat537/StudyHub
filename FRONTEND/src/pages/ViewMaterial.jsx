import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Document, Page, pdfjs } from "react-pdf";
import API from '../config';

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
        const res = await axios.get(`${API}/materials/${id}`);

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

    
    </div>
  );
}

export default ViewMaterial;
