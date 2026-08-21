import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/chooseSemester.css";

function ChooseSemester() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const type = params.get("type");

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  const handleSemester = (semester) => {
    navigate(`/materials?type=${type}&semester=${semester}`);
  };

  return (
    <div className="semester-page">

      <div className="semester-header">
        <p className="semester-label">ACadex Resources</p>

        <h1>Choose Your Semester</h1>

        <p className="semester-subtitle">
          Select your semester to explore{" "}
          <strong>{type || "study materials"}</strong>.
        </p>
      </div>

      <div className="semester-grid">
        {semesters.map((semester) => (
          <div
            className="semester-card"
            key={semester}
            onClick={() => handleSemester(semester)}
          >
            <div className="semester-number">
              {semester}
            </div>

            <h3>Semester {semester}</h3>

            <p>
              Explore materials
            </p>

            <span className="semester-arrow">
              →
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ChooseSemester;