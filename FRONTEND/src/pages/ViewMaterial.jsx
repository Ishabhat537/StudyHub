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
  const [pageNumber,setPageNumber]=useState(1);

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
    setPageNumber(1);
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
           <Page
    pageNumber={pageNumber}
    width={800}
    renderTextLayer={false}
    renderAnnotationLayer={false}
  />

         
        </Document>

        <div className="d-flex align-items-center gap-3 mt-3">
          <button className="btn btn-outline-primary"
          disabled={pageNumber===1}
          onClick={()=>setPageNumber(pageNumber-1)}>
            Previous
          </button>

           <span>
    Page {pageNumber} of {numPages}
  </span>

  <button
    className="btn btn-primary"
    disabled={pageNumber === numPages}
    onClick={() => setPageNumber(pageNumber + 1)}
  >
    Next
  </button>
        </div>
      </div>

    
    </div>
  );
}

export default ViewMaterial;
