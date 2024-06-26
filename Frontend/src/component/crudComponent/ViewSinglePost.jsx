import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom';


export default function ViewSinglePost() {
    const {id} = useParams();
    const [posts, setPosts] = useState([]);
    const [name, setName] = useState('');
  
    useEffect(() => {
        
           
      axios.get(`http://127.0.0.1:8000/api/viewPost/${id}`)
        .then(response => {
            console.log(response.data.blog);
          setPosts(response.data.blog);
          setName(response.data.blog.user.name);
          console.log(name);
        })
        .catch(error => {
          console.error('There was an error fetching the posts!', error);
        });   
           
    }, [id]);
  return (
    
         <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img  src={`http://127.0.0.1:8000/images/${posts.image}`} alt={posts.title} className="w-full h-82  object-fill" />
          <p className="text-gray-700 m-4">Published on {new Date(posts.updated_at).toLocaleDateString()} by <span className="mx-1 text-sm font-medium text-gray-900" >{name}</span> </p>
        <div className="p-2">
          <h2 className="text-2xl font-bold mb-2 py-3 ">{posts.title}</h2>
          <p className="text-gray-700 mb-6 font-semibold">{posts.description}</p>
          
        </div>
      </div>
    </div>
    
  )
}
