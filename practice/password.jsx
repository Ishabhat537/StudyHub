import React from 'react';
import { useState
 } from 'react';

 function Password() {
    const [showPassword,setShowPassword]=useState();
    setShowPassword(prev=>!prev);
   
   
    return ( <>
    <input {...showPassword=="text"?"password":"text"}
     type="text"  />
    </> );
 }
 
 export default Password;