import React from "react";
function StudyHub() {
  return (
    <>
      <div className="container py-5">
        <div className="text-center mb-5">
          <p className="text-primary fw-bold">WHY STUDYHUB</p>
          <h2 className="fw-bold display-5">Why Choose StudyHub?</h2>
        </div>

        <div className="row g-4">
          <div className="col-md-3">
            <div className="card h-100 shadow-sm border-0 p-3">
              <h4>Organized Notes</h4>

              <p>Browse materials by subject and semester.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card h-100 shadow-sm border-0 p-3">
              <h4>Secure Uploads</h4>

              <p>Only authenticated users can upload resources.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card h-100 shadow-sm border-0 p-3">
              <h4>Cloud Access</h4>

              <p>Access study materials anytime, anywhere.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card h-100 shadow-sm border-0 p-3">
              <h4>Student Collaboration</h4>

              <p>Learn and share knowledge together.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudyHub;
