import React from 'react';
import '../../styles/testinomals.css'
import { FaStar } from 'react-icons/fa';
function Testinomals() {
    const testimonials = [
  {
    name: "ISHA BHAT",
    course: "BE IT Student",
    review:
      "StudyHub made finding notes and previous year papers much easier.",
  },
  {
    name: "GUNU PATEL",
    course: "Computer Engineering",
    review:
      "The interface is clean and downloading study materials is very fast.",
  },
  {
    name: "riya sharma",
    course: "Information Technology",
    review:
      "Uploading and sharing notes with classmates has become really simple.",
  },
]
    return (
     <div className="container py-5">
      <h2 className="text-center fw-bold">What Students Say</h2>
      <p className="text-center text-muted mb-5">
        Trusted by students for sharing and accessing study materials.
      </p>

      <div className='row'>
        {testimonials.map((item,index)=>(
             <div className="col-md-4 mb-4" key={index}>
            <div className="testimonial-card h-100">

              <div className="mb-3 text-warning">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p>"{item.review}"</p>

              <h5>{item.name}</h5>

              <small className="text-muted">
      {item.course}
              </small>

            </div>
          </div>
        ))}
      </div>
</div>
     );
}

export default Testinomals;