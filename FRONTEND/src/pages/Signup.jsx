import React from 'react';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';
import "../styles/auth.css"
import API from '../config';
function Signup() {

        const navigate=useNavigate();
        const [inputValue,setInputValue]=useState({
            email:"",
            username:"",
            password:"",
        });
        const {email,username,password}=inputValue;

        const handleOnChange=(e)=>{
            const {name,value}=e.target;
            setInputValue({
                ...inputValue,
                [name]:value,
            });
        };
        const handleError=(err)=>{
            toast.error(err,{
                position:"botton-left",
            });
        }
        const handleSuccess=(msg)=>{
            toast.success(msg,{
                position:"bottom-right"
            });
        };

        const handleSubmit=async(e)=>{
            e.preventDefault();
            try{
                const {data}=await axios.post(`${API}/send-otp`,{
                    ...inputValue,
                },
                {withCredentials:true}
            );
            const {success,message}=data;
           if (success) {
  handleSuccess(message);

  navigate("/verify-otp", {
    state: {
      email,
    },
  });
}

            }catch(err){
                console.log(err);

            }
            setInputValue({
                ...inputValue,
                email:"",
                username:"",
                password:"",
            });
        };
         
        


    
    return ( <>
    <div className='form_page'>
    <div className='form_container'>
        <h2>Signup Account</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={email} placeholder='Enter your email' onChange={handleOnChange}/>
            </div>
              <div>
          <label htmlFor="email">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
         <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
        </form>
             <ToastContainer />
    </div>
    </div>
   
    </> );

    }
export default Signup;