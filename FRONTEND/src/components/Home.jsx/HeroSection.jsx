import React, { useContext } from 'react';
import hero from '../../assets/hero.jpg'
import '../../styles/hero.css'
import newimg from '../../assets/newimg.png';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
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
    return ( <>
   <div className="container py-5">
  <div className="row align-items-center g-4">

    <div className="col-lg-6 col-12">
      <p className="text-primary fw-bold text-center text-lg-start">
        Smart Learning Platform for BE Students
      </p>

      <h1 className="display-3 fw-bold hero-text text-center text-lg-start">
        Share. Learn. Succeed.
      </h1>

      <p className="lead text-secondary text-center text-lg-start">
        One place for notes, PYQs, assignments and study resources.
      </p>

     <div className="mt-4 d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">

  <button
    className="btn btn-primary btn-md"
    onClick={handleMaterials}
  >
    Explore Materials
  </button>

  <button
    className="btn btn-outline-primary btn-md"
    onClick={handleUpload}
  >
    Upload Material
  </button>



      </div>
    </div>

    <div className="col-lg-6 col-12">
      <img
        src={newimg}
        alt="Acadex study resources"
        className="img-fluid hero_img"
      />
    </div>

  </div>
</div>
    </> );
}

export default HeroSection;