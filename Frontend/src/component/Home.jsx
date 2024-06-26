import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Home = () => {
  const [posts, setPosts] = useState([]); 
  useEffect(() => {
    let user =sessionStorage.getItem('user');
   
    async function run(){
      try{
    const res = await axios.post(`http://127.0.0.1:8000/api/myBlog/${user}`,{},{
      headers:{
        "Authorization":`Bearer ${sessionStorage.getItem('jwtToken')}`
      }
    });
    setPosts(res.data.blog);
  }catch(error){
    console.log('There was an error fetching the posts!', error);
  };
    } 
    run();
  }, []);
  if(posts.length ===0 ){
    return (<div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-64 h-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex flex-col gap-6 text-center" role="alert">
        <div><strong className="font-bold font-serif text-blue-600  text-2xl">Blog space is awaiting your first entry.</strong> </div>
        <h3 className="block sm:inline"> Start sharing your thoughts with the world!</h3>
      
      
      <Link to="/createPost" className=" justify-end bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg  font-semibold transition duration-300">
      Compose a New Article
              </Link>
              </div>
    </div>
    );
  }else{
  return (
    
    
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg">
             {post.image && <img src={`http://127.0.0.1:8000/images/${post.image}`} alt={post.title} className="mb-4 w-full h-48 object-cover rounded" />} 
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-700">{post.description.substring(0, 100)}...</p>
            <div className="px-2 pt-4 pb-2 flex  justify-between">
        <h5 className="text-gray-600 text-sm ">Status : <span className=' uppercase font-sans font-semibold  text-slate-950'>{post.is_publish}</span> </h5>
        <h5 className="text-gray-900 text-sm float-right">Published Date: {post.updated_at.substring(0, 10)}</h5>
      </div>
            <div className=" pt-4 flex justify-between mt-2 ">
        <Link to={`/viewPost/${post.id}`} className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-400 transition duration-300">View</Link>
        <Link to={`/editPost/${post.id}`} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition duration-300">Edit</Link>
        <Link to={`/deletePost/${post.id}`} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition duration-300">Delete</Link>
      </div>

          </div>
          
        ))}
    
      
      </div> 
    </div>
      
  );}
};

export default Home;
