import { useNavigate } from "react-router-dom";
import {
  FaDatabase,
  FaLaptopCode,
  FaNetworkWired,
  FaJava,
  FaPython,
  FaRobot,
  FaCogs
} from "react-icons/fa";

import { MdDataObject } from "react-icons/md";

function SubjectSection() {
  const navigate = useNavigate();

  const subjects = [
    {
      name: "Data Structures",
      icon: <MdDataObject/>,
    },
    {
      name: "DBMS",
      icon: <FaDatabase/>,
    },
    {
      name: "Operating System",
      icon: <FaLaptopCode/>,
    },
    {
      name: "Computer Networks",
      icon: <FaNetworkWired/>,
    },
    {
      name: "Software Engineering",
      icon: <FaCogs/>,
    },
    {
      name: "Java",
      icon: <FaJava/>,
    },
    {
      name: "Python",
      icon: <FaPython/>,
    },
    {
      name: "Artificial Intelligence",
      icon: <FaRobot/>,
    },
  ];

  return (
    <section className="home-section container subject-section">
      <div className="section-heading text-center">
      <p className="section-kicker">Build your toolkit</p>
      <h2 className="section-title mb-2">
        Popular Subjects
      </h2>

      <p className="text-center text-muted mb-5">
        Explore materials by subject.
      </p></div>

      <div className="row g-4">
        {subjects.map((subject) => (
          <div className="col-lg-3 col-md-4 col-6" key={subject.name}>
            <button
              className="subject-card text-center h-100"
              onClick={() =>
                navigate(
                  `/materials?subject=${encodeURIComponent(subject.name)}`
                )
              }
            >
              <span className="subject-icon">{subject.icon}</span>

              <h6 className="mt-2">{subject.name}</h6>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SubjectSection;