import { useNavigate } from "react-router-dom";

function SemesterSection() {
  const navigate = useNavigate();

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4">Browse by Semester</h2>

      <div className="row g-4">
        {semesters.map((sem) => (
          <div className="col-lg-3 col-md-4 col-6" key={sem}>
            <div
              className="card shadow-sm text-center p-4"
              style={{ cursor: "pointer", borderRadius: "15px" }}
              onClick={() => navigate(`/materials?semester=${sem}`)}
            >
              <h1>📚</h1>
              <h5>Semester {sem}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SemesterSection;