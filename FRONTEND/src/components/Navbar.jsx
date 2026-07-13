import React, { useEffect, useState } from "react";
import studyhub from "../assets/studyhub.png";
import "../styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { FaBook, FaFolderOpen, FaHome, FaUpload } from "react-icons/fa";
function Navbar() {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const navigate=useNavigate();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState(null);
  // const verifyUser = async () => {
    // try {
      // const response = await axios.get("http://localhost:3000/verify", {
        // withCredentials: true,
      // });
      // if (response.data.status) {
        // setIsLoggedIn(true);
        // setUser(response.data.user);
      // } else {
        // setIsLoggedIn(false);
      // }
    // } catch (err) {
      // console.log(err);
    // }
  // };
  // useEffect(()=>{
    // verifyUser();
  // },[]);

  // const handleLogout = async () => {

  // try {

    // await axios.post(
      // "http://localhost:3000/logout",
      // {},
      // {
        // withCredentials: true
      // }
    // );

    // setIsLoggedIn(false);
    // setUser(null);

  // } catch (err) {

    // console.log(err);

  // }

// };
const handleLogout=async()=>{
  await logout();
  navigate("/");
}

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand ml-5" href="/">
           <FaHome/> <img src={studyhub} style={{ height: "3rem", width: "6rem" }}></img>
          </a>
<button
  className="navbar-toggler"
  type="button"
  data-bs-toggle="collapse"
  data-bs-target="#navbarSupportedContent"
  aria-controls="navbarSupportedContent"
  aria-expanded="false"
  aria-label="Toggle navigation"
>
  <span className="navbar-toggler-icon"></span>
</button>


          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-5 text-center">
              <li className="nav-item ">
                <Link className="nav-link " to="/materials">
                 <FaBook/> Materials
                </Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link " to="/upload">
                <FaUpload/>  Upload
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-semibold" href="/myuploads">
                <FaFolderOpen/>  My Uploads
                </a>
              </li>
            </ul>

            {isLoggedIn ? (
              <>

              <div className="ms-lg-auto mt-3 mt-lg-0 d-flex justify-content-center">

  <button
    className="btn btn-primary rounded-circle profile-btn dropdown-toggle d-flex align-items-center justify-content-center"
    type="button"
    data-bs-toggle="dropdown"
  >
   {user && user.username.charAt(0).toUpperCase()}
  </button>

  <span className="ms-2 username-text d-none d-md-inline">
    {user?.username}
  </span>

  <ul className="dropdown-menu dropdown-menu-end">

    <li>
      <button
        className="dropdown-item text-danger"
        onClick={handleLogout}
      >
        Logout
      </button>
    </li>

  </ul>

</div>



            
              </>
            ) : (
              <>
                <div className="d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0 justify-content-center">
                  <Link to="/login" className="btn btn-outline-primary">
                    Login
                  </Link>
                  <Link to="/signup" className="btn btn-primary">
                    Signup
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    
    </>
  );
}

export default Navbar;
