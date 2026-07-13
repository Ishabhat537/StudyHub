import { useNavigate } from "react-router-dom";

function CategorySection() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Notes",
      icon: "📄",
      description: "Study Notes",
      type: "Notes",
    },
    {
      title: "PYQs",
      icon: "📝",
      description: "Previous Year Papers",
      type: "PYQ",
    },
    {
      title: "Assignments",
      icon: "📂",
      description: "College Assignments",
      type: "Assignment",
    },
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-2">
        Browse by Category
      </h2>

      <p className="text-center text-muted mb-5">
        Quickly find the type of material you need.
      </p>

      <div className="row justify-content-center g-4">

        {categories.map((category) => (

          <div className="col-lg-4 col-md-6" key={category.type}>

            <div
              className="card shadow-sm border-0 p-4 text-center h-100"
              style={{
                cursor: "pointer",
                borderRadius: "15px",
                transition: "0.3s",
              }}
              onClick={() =>
                navigate(`/materials?type=${category.type}`)
              }
            >
              <h1>{category.icon}</h1>

              <h4 className="mt-3">
                {category.title}
              </h4>

              <p className="text-muted">
                {category.description}
              </p>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
}

export default CategorySection;