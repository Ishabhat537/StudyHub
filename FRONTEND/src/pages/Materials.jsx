import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialCard from "../components/MaterialCard";
import { useSearchParams } from "react-router-dom";
import API from '../config';
import { FaBook } from "react-icons/fa";


function Materials() {

  const [materials, setMaterials] = useState([]);
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();


const [semester, setSemester] = useState(
  searchParams.get("semester") || ""
);

const [subject, setSubject] = useState(
  searchParams.get("subject") || ""
);

const [course, setCourse] = useState(
  searchParams.get("course") || ""
);

const [type, setType] = useState(
  searchParams.get("type") || ""
);

const [year, setYear] = useState(
  searchParams.get("year") || ""
);


  const fetchData = async () => {

    try {

      const [materialsRes, userRes] =
        await Promise.all([

          axios.get(
            `${API}/materials`,
            {
              params: {
                search,
                semester,
                subject,
                course,
               
                year,
                type
              },
            }
          ),

          axios.get(
            `${API}/verify`,
            {
              withCredentials: true,
            }
          ),

        ]);

      setMaterials(materialsRes.data.materials);

      setUser(userRes.data.user);
      console.log("user :",user);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };


  // INITIAL LOAD
  useEffect(() => {

    fetchData();

  }, [search,semester,subject,course,type,year]);

  const clearFilters=async()=>{
   setSearch("");
  setSemester("");
  setSubject("");
  setCourse("");
  setType("");
  setYear("");

  }




  return (
    <>

  


    <div className="materials-page">

  <h1 className="main-heading">
    <FaBook/> Browse Study Materials
  </h1>

  <p className="sub-heading">
    Find notes, PYQs, assignments and study resources easily.
  </p>


  <form
    className="search-container"
    onSubmit={(e) => e.preventDefault()}
  >

    {/* SEARCH INPUT */}
    <div className="search-bar">

  <input
    type="text"
    placeholder="Search notes..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="search-input"
  />

  <button
    type="button"
    className="search-btn"
    onClick={fetchData}
  >
    Search
  </button>

</div>
    {/* FILTERS */}
    <div className="filters-section">
       <div className="row g-3 mt-3">
 <div className="col-lg col-md-4 col-12">
      <select
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
        className="form-select"
      >
        <option value="">All Semesters</option>
        <option value="1">Semester 1</option>
  <option value="2">Semester 2</option>
  <option value="3">Semester 3</option>
  <option value="4">Semester 4</option>
  <option value="5">Semester 5</option>
  <option value="6">Semester 6</option>
  <option value="7">Semester 7</option>
  <option value="8">Semester 8</option>
      </select>
      
      </div>
<div className="col-lg col-md-4 col-12">
      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
            className="form-select"
      >
        <option value="">All Subjects</option>
         <option value="Data Structures">
    Data Structures
  </option>

  <option value="DBMS">DBMS</option>

  <option value="Operating System">
    Operating System
  </option>

  <option value="Computer Networks">
    Computer Networks
  </option>

  <option value="Software Engineering">
    Software Engineering
  </option>

  <option value="Java">Java</option>

  <option value="Python">Python</option>
   <option value="Machine Learning">
    Machine Learning
  </option>

  <option value="Artificial Intelligence">
    Artificial Intelligence
  </option>
      </select>
      </div>
<div className="col-lg col-md-4 col-12">
      <select
        value={course}
        onChange={(e) => setCourse(e.target.value)}
            className="form-select"
      >
        <option value="">All Courses</option>
         <option value="BE">BE</option>
      </select>
      </div>
<div className="col-lg col-md-4 col-12">
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
            className="form-select"
      >
        <option value="">All Types</option>
         <option value="Notes">Notes</option>
  <option value="PYQ">PYQ</option>
  <option value="Assignment">Assignment</option>
      </select>
      </div>
<div className="col-lg col-md-4 col-12">
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
            className="form-select"
      >
        <option value="">All Years</option>
        <option value="2025">2025</option>
  <option value="2024">2024</option>
  <option value="2023">2023</option>
  <option value="2022">2022</option>
  <option value="2021">2021</option>
  <option value="2020">2020</option>
      </select>
      </div>
 <div className="button-group">
  
   <button
     type="button"
     className="clear-btn px-4"
     onClick={clearFilters}
   >
     Clear Filters
   </button>
 </div>
     

    </div>
    </div>


    {/* BUTTONS */}



  </form>

</div>


<div className="container pt-2">
   {materials.length === 0 ? (

    <div className="text-center py-5">

      <div style={{ fontSize: "80px" }}>
        📂
      </div>

      <h3 className="fw-bold mt-3">
        No Materials Found
      </h3>

      <p className="text-muted">
        We couldn't find any study materials matching your search or filters.
      </p>

      <button
        className="btn btn-primary mt-2"
        onClick={clearFilters}
      >
        Clear Filters
      </button>

    </div>

  ) :(

  <div className="row  g-4">
    <div className="d-flex justify-content-between align-items-center mb-3">

<h5>

{materials.length} Material{materials.length !==1 && "s"} Found

</h5>

</div>

    {materials.map((material) => (

      <div className="col-lg-4 col-md-6 col-12"
      
        key={material._id}
      >

        <MaterialCard
          material={material}
          userId={user?._id}
        />

      </div>

    ))}

  </div>
  )}
  
</div>
  
</>
  )}
export default Materials;
