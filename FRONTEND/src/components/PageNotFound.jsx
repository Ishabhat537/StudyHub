import React from 'react';
import { Link } from 'react-router-dom';
function PageNotFound() {
    return ( <>
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-7xl font-bold text-blue-600">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Page Not Found!</h2>
        <p className="text-2xl font-semibold mt-4">Page you are looking for doesn't exist</p>

   <Link to="/" className='text-center'>Home</Link>
    </div>
    </> );
}

export default PageNotFound;