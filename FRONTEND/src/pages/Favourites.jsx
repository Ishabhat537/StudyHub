import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import API from "../config";
import MaterialCard from '../components/MaterialCard';
function Favourites() {
     const [favourites,setFavourites]= useState([]);
    const [userId,setUserId]=useState("");

    useEffect(()=>{
        fetchMaterials();
        
    },[]);

    const fetchMaterials=async()=>{
        try{
             const res = await axios.get(
        `${API}/favourites`,
        {
          withCredentials: true,
        }
      );

      setFavourites(res.data.materials);
      setUserId(res.data.userId);

        }catch(err){
            console.log(err);

        }
    }
    return ( <>
    <div className='materials-container'>
        <h2>My Favourites</h2>

        {favourites.length === 0? (
            <p>No favourites yet!</p>

        ):(
            <div className='materials-grid'>
                {favourites.map((material)=>(
                    <MaterialCard key={material._id}
                    material={material}
                    userId={userId}
                    />
                ))}
            </div>
            

        )}
    </div>
  
    </> );
}

export default Favourites;