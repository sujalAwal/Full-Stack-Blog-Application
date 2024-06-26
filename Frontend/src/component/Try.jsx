import axios from 'axios';
import React, { useEffect } from 'react'

export default function Try() {
    
   
    const handleSubmit = async () => {
       
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/try')
          console.log(response);
          // setMessage(response.data);
        } catch (error) {
        //   setMessage('Invalid credentials');
        console.log(error);
        }
      };
  return (
    <button onClick={handleSubmit}>Clcik me</button>
  )
}
