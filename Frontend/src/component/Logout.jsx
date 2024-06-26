// LogoutButton.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const history = useNavigate();

  useEffect(()=>{
   try{ async function fetchData(){
    const response = await axios.post('http://127.0.0.1:8000/api/logout',{},
      { headers: {
        "Authorization":`Bearer ${sessionStorage.getItem('jwtToken')}`
      }}
    )
  }
    sessionStorage.clear(); 
    history('/'); }
    catch (error) {
      console.error('Logout failed:', error);
      // Handle logout error
    }
  },[])


  return (
  <div>
    
    </div>
  );
};

export default Logout;
