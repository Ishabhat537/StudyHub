import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaArrowRight } from "react-icons/fa";

function SemesterSection() {
  const navigate = useNavigate();

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <section className="home-section container semester-section">
      <div className="section-heading">
        <p className="section-kicker">Your academic journey</p>
        <h2 className="section-title mb-2">Browse by semester</h2>
        <p className="section-description">Jump straight into the material you need today.</p>
      </div>

      <div className="row g-4">
        {semesters.map((sem) => (
          <div className="col-lg-3 col-md-4 col-6" key={sem}>
            <button
              className="semester-card text-center"
              onClick={() => navigate(`/materials?semester=${sem}`)}
            >
              <span className="semester-number">{String(sem).padStart(2, "0")}</span>
              <FaBookOpen className="semester-icon" />
              <h5>Semester {sem}</h5>
              <FaArrowRight className="semester-arrow" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SemesterSection;