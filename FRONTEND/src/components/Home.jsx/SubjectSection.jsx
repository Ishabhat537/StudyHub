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
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-2">
        Popular Subjects
      </h2>

      <p className="text-center text-muted mb-5">
        Explore materials by subject.
      </p>

      <div className="row g-4">
        {subjects.map((subject) => (
          <div className="col-lg-3 col-md-4 col-6" key={subject.name}>
            <div
              className="card shadow-sm text-center p-4 h-100"
              style={{ cursor: "pointer", borderRadius: "15px" }}
              onClick={() =>
                navigate(
                  `/materials?subject=${encodeURIComponent(subject.name)}`
                )
              }
            >
              <h1>{subject.icon}</h1>

              <h6 className="mt-2">{subject.name}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubjectSection;