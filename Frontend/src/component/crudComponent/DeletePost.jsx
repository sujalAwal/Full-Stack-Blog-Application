import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


export default function DeletePost() {
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
    
     const run =  async ()=>{
      try{
       
        const response =  await axios.delete(`http://127.0.0.1:8000/api/deletePost/${id}`,{
            headers:{
              
              "Authorization":`Bearer ${sessionStorage.getItem('jwtToken')}`
            }
          });
          
          console.log(response.data);
          navigate('/index');
        }    
          catch(error){
              console.error('There was an error fetching the posts!', error);
            };}
           run(); 
        },  []);
    
  return (
    <div>DeletePost</div>
  )
}
