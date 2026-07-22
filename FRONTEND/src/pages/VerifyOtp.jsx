import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "../styles/auth.css"
import API from '../config';

function VerifyOtp(){
    const [otp,setOtp]=useState("");

    const location =useLocation();
    const navigate=useNavigate();

    const email=location.state?.email;
    useEffect(() => {
  if (!email) {
    navigate("/signup");
  }
}, [email, navigate]);
    const handleSubmit=async(e)=>{
        e.preventDefault();

        try{
             const { data } = await axios.post(
        `${API}/verify-otp`,
        {
          email,
          otp,
        },
        {
          withCredentials: true,
        }
      );
        if (data.success) {
        toast.success(data.message);

        setOtp("");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(data.message);
        }
    }catch(err){
             console.log(err);
      toast.error("Something went wrong!");
        
    }
    }

    return(
         <div className="form_page">
      <div className="form_container">
        <h2>Verify OTP</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Enter OTP</label>

            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              maxLength={6}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <button type="submit">Verify OTP</button>
        </form>

        <ToastContainer />
      </div>
    </div>
    );
}

export default VerifyOtp;