import React, { useContext } from 'react';
import hero from '../../assets/hero.jpg'
import '../../styles/hero.css'
import studyimg from '../../assets/studyimg.png'
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
    <div className='container py-5' >
        <div className='row'>
            <div className='col-lg-6 col-12'>
                <p  className="text-primary fw-bold text-center text-lg-start">Smart Learning Platform for Students</p>
                <h1  className="display-3 fw-bold hero-text text-center text-lg-start">Share. Learn. Succeed.</h1>
                <p  className="lead text-secondary text-center text-lg-start">One Place for Notes, Resources, and Learning</p>
                 <div className="mt-4 d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
            <button
              className="btn btn-primary btn-md me-3"
              onClick={handleUpload}
             
            >
              Upload Material
            </button>

            <button
              className="btn btn-outline-primary btn-md"
              onClick={handleMaterials}
             
            >
              Explore Materials
            </button>
          </div>
            </div>
             <div className='col-lg-6 col-12'>
                <img src={studyimg} alt=""  className="img-fluid hero_img"/>
             </div>
        </div>

    </div>
    </> );
}

export default HeroSection;