import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UploadMaterial from "./pages/UploadMaterial";
import Materials from "./pages/Materials";
import HomePage from "./components/Home.jsx/HomePage";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import MyUploads from "./pages/MyUploads";
import EditMaterial from "./pages/EditMaterial";
import ViewMaterial from "./pages/ViewMaterial";
import { VerifyOtp } from "./pages/VerifyOtp";


function App() {
  return (
    <>
   <Navbar/>
      <Routes>
         <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<UploadMaterial />} />
         <Route path="/materials" element={<Materials />} />
           <Route path="/myuploads" element={<MyUploads/>} />
           <Route path="/edit/:id" element={<EditMaterial/>} />
           <Route path="/view/:id" element={<ViewMaterial/>}/>
           <Route path="/verify-otp" element={<VerifyOtp/>} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
