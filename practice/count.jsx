import React from 'react';
import { useState } from 'react';
function Count() {
     const [count,setCount]=useState(0);
     const increment=()=>{
        setCount(prevCount=>prevCount+1);
     }
     const decrement=()=>{
       if(count>0){
          setCount(prevCount=>prevCount-1);
       }
     }
     const refresh=()=>{
      setCount(0);
     }
    return ( <>
    <h1>COUNT: {count}</h1>
    <button onClick={increment}>Increment</button>
    <button onClick={decrement}>Decrement</button>
   <button onClick={refresh}>Refresh</button>

    </> );
}

export default Count;