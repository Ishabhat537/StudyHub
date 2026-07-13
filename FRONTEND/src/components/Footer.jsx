import React from 'react';
import StudyHub from '../assets/studyhub.png';
import { Link } from 'react-router-dom';
import {FaGithub,FaLinkedin,FaEnvelope} from 'react-icons/fa'
function Footer() {
    return ( <>
    <div className='container bg-body-tertiary mb-5 mt-auto'>
        <div className='row mt-5'>
            <div className='col-4 mt-5'>
                <img src={StudyHub} alt="" style={{width:"6rem",height:"3rem"}}/>
                <p className=' fs-7 text-muted'>Your collaborative platform for sharing and accessing study materials.</p>
            </div>
            <div className='col-4 mb-2 mt-5'>
                <h2 className='fs-5'>Quick Links</h2>
                <ul className='list-unstyled'>
                    <li className='mb-2'><Link to='/' className="text-decoration-none">Home</Link></li>
                     <li className='mb-2'><Link to='/materials' className="text-decoration-none">Materials</Link></li>
                      <li className='mb-2'><Link to='upload' className="text-decoration-none">Uploads</Link></li>
                       <li className='mb-2'><Link to='/myUploads' className="text-decoration-none">My Uploads</Link></li>
                        <li className='mb-2'><Link to='login'className="text-decoration-none">Login</Link></li>
                </ul>
            </div>
            <div className='col-4 mt-5'>
                <h2 className='fs-5'>Contact</h2>
                <ul>
                    <li className='mb-2'><FaGithub/>Github</li>
                    <li className='mb-2'><FaLinkedin/>Linkedin</li>
                    <li className='mb-2'><FaEnvelope/>Email</li>
                </ul>
            </div>
        </div>
         <hr className="mt-4" />

          <div className="text-center text-muted ">
            © 2026 StudyHub. All rights reserved.
          </div>
    </div>
    </> );
}

export default Footer;