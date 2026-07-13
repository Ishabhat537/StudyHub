import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import MaterialCard from "../components/MaterialCard";

function MyUploads() {
  const navigate = useNavigate();

  const [materials, setMaterials] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const res = await axios.get("http://localhost:3000/myuploads", {
          withCredentials: true,
        });

        setMaterials(res.data.materials);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUploads();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/verify", {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/materials/${id}`, {
        withCredentials: true,
      });

      setMaterials(materials.filter((material) => material._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="fw-bold text-center mb-5">My Uploads</h1>
      {!user?(
        <>
        <div className="text-center">

    
               <p>Login to see your uploads!</p>
 <Link to="/login">Login here</Link>
     </div>
       </>)
       

      :materials.length > 0 ?(
              <div className="row g-4 justify-content-center">
        {materials.map((material) => (
          <div className="col-xl-5 col-lg-7" key={material._id}>
            <MaterialCard
              material={material}
              userId={user?._id}
              showActions={true}
              onEdit={() => navigate(`/edit/${material._id}`)}
              onDelete={() => handleDelete(material._id)}
            />
          </div>
        ))}
      </div>

      ):(
        <>
         <p
    style={{
      textAlign: "center",
      fontSize: "2rem",
    }}
  >
    No uploads yet!
  </p>
        </>
      )}
</div>
      );

    
     

}

export default MyUploads;
