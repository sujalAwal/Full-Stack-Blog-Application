import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="bg-pink-500 p-4 rounded-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
         <Link to="/"> SysQube Blog</Link> 
        </div>
        <div>
        {sessionStorage.getItem('jwtToken')?(<div>
          <Link to="/index" className="mx-2 py-2 px-4 rounded bg-white text-green-600 hover:bg-green-600 hover:text-white">
          My Blog
          </Link>
          <Link to="/logout" className="mx-2 py-2 px-4 rounded bg-white text-red-700 hover:bg-blue-800 hover:text-white">
           LogOut
          </Link>
          </div>):(<div><Link to="/login" className="mx-2 py-2 px-4 rounded bg-white text-indigo-800 hover:bg-blue-500 hover:text-white">
           Login
          </Link>
          <Link to="/signup" className="mx-2 py-2 px-4 rounded bg-white text-indigo-800 hover:bg-green-500 hover:text-white">
            Sign Up
          </Link></div>)
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
