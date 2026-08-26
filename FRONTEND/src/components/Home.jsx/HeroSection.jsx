import { useContext } from 'react';
import '../../styles/hero.css'
import newimg from '../../assets/newimg.png';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaCloudUploadAlt, FaCheckCircle } from 'react-icons/fa';
function HeroSection() {
    const navigate=useNavigate();
    const {isLoggedIn}=useContext(AuthContext);

    const handleUpload=async()=>{
        if(isLoggedIn){
            navigate("/upload");
        }else{
            navigate("/login");
        }
    }
     const handleMaterials=async()=>{
     if(isLoggedIn){
         navigate("/materials");
     }else{
         navigate("/login");
     }
 }
    return (
  <section className="home-hero container">
  <div className="row align-items-center g-4">

    <div className="col-lg-6 col-12">
      <p className="hero-kicker text-center text-lg-start">
        <span className="hero-kicker-dot" /> Smart learning for BE students
      </p>

      <h1 className="display-3 fw-bold hero-text text-center text-lg-start">
        Share. Learn. Succeed.
      </h1>

      <p className="lead text-secondary text-center text-lg-start">
        One focused place for notes, PYQs, assignments and the resources that get you through the semester.
      </p>

    <div className="hero-actions mt-4 d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">

  <button
    className="btn btn-primary btn-md"
    onClick={handleMaterials}
  >
    Explore materials <FaArrowRight />
  </button>

  <button
    className="btn btn-outline-primary btn-md"
    onClick={handleUpload}
  >
    <FaCloudUploadAlt /> Upload material
  </button>



      </div>
    </div>

    <div className="col-lg-6 col-12 hero-visual-column">
      <img
        src={newimg}
        alt="StudyHub learning resources"
        className="img-fluid hero_img"
      />
      <div className="hero-proof"><FaCheckCircle /> Built for the way students study</div>
    </div>

  </div>
</section>
  );
}

export default HeroSection;