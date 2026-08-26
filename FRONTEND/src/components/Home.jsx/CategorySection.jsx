import { useNavigate } from "react-router-dom";
import { FaFileAlt, FaClipboardList, FaFolderOpen } from "react-icons/fa";

function CategorySection() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Notes",
      icon: <FaFileAlt />,
      description: "Study Notes",
      type: "Notes",
    },
    {
      title: "PYQs",
      icon: <FaClipboardList />,
      description: "Previous Year Papers",
      type: "PYQ",
    },
    {
      title: "Assignments",
      icon: <FaFolderOpen />,
      description: "College Assignments",
      type: "Assignment",
    },
  ];

   const handleCategoryClick = (type) => {
  navigate(`/choose-semester?type=${type}`);
};

  return (
    <section className="home-section container category-section">
      <div className="section-heading text-center">
      <p className="section-kicker">Find your starting point</p>
      <h2 className="section-title mb-2">
        Browse by Category
      </h2>

      <p className="text-center text-muted mb-5">
        Quickly find the type of material you need.
      </p></div>

      <div className="row justify-content-center g-4">

        {categories.map((category) => (

          <div className="col-lg-4 col-md-6" key={category.type}>

            <button
              className="browse-card category-card text-center h-100"
              onClick={() =>
                handleCategoryClick(category.type)
              }
            >
              <span className="browse-card-icon">{category.icon}</span>

              <h4 className="mt-3">
                {category.title}
              </h4>

              <p className="text-muted">
                {category.description}
              </p>

            </button>

          </div>

        ))}

      </div>
    </section>
  );
}

export default CategorySection;