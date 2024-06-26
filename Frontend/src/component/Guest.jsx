import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Guest() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/BlogIndex`)
      .then(response => {
        setPosts(response.data.blog);
        console.log(response.data)
      })
      .catch(error => {
        console.error('There was an error fetching the posts!', error);
      });   
      
  }, []);
    return (
      <div>
        <div className="min-h-screen bg-slate-200 flex items-center justify-center">
          <div className="max-w-4xl p-8  bg-[url('https://imgs.search.brave.com/JVAZmiKDFVF8XpN0RU15MZDyv3ZLRzBjlhZ2KHxhP2Y/rs:fit:860:0:0/g:ce/aHR0cDovL20uZ2V0/dHl3YWxscGFwZXJz/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMC8wNC9XYWxs/cGFwZXItQmxhY2tw/aW5rLmpwZw')] bg-cover shadow-lg rounded-lg text-gray-800">
            <h2 className="text-4xl font-bold mb-4 text-center font-serif  text-pink-400">Welcome to Our Blog App!</h2>
            <p className="text-2xl mb-4 text-cyan-500">
              Start sharing your thoughts, experiences, and ideas with the world through our intuitive and easy-to-use blog platform.
            </p>
            <p className="text-2xl mb-4 text-sky-400">
              Whether you're a seasoned writer or just starting out, our app provides all the tools you need to create, publish, and manage your blogs effortlessly.
            </p>
            <p className=" mb-6 text-white text-xl ">
              Join our community today and connect with like-minded individuals who share your passion for storytelling and knowledge sharing.
            </p>
            <div className="flex justify-center space-x-4">
              {(sessionStorage.getItem('jwtToken'))?( <Link to="/createPost" className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg text-lg font-semibold transition duration-300">
                Start a New Blog Post
              </Link>):
             ( <>
              <Link to="/login" className="bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-6 rounded-lg text-lg font-semibold transition duration-300">
                Log In
              </Link> 
              <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg text-lg font-semibold transition duration-300">
                Sign Up
              </Link> </>)}
           
            </div>
          </div>
          </div>
          
        {( posts.length !=0 )?(<><div class="bg-gradient-to-br from-pink-500 to-green-100  w-full bg-white shadow-md rounded-lg p-6 text-center"><h2 className='text-2xl font-bold font-serif '>Explore Our Posts</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 ">
          
        {posts.map(post => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg">
             {post.image && <img src={`http://127.0.0.1:8000/images/${post.image}`} alt={post.title} className="mb-4 w-full h-48 object-cover rounded " />} 
           <div className='flex w-full justify-end mb-3 '>
           <h5 className="text-black-900 float-right mt-2 font-sans  text-lg"> {post.updated_at.substring(0, 10)}</h5>
             </div>
             <h2 className="font-bold mb-2 font-mono text-6xl text-cyan-900">{post.title}</h2>
            <div className=" pt-4 pb-2 flex  justify-between">
        <span className="text-pink-600 text-lg " >Published by: {post.user.name}</span>
        <Link to={"/viewPost/"+post.id} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition duration-300 mt-2">View</Link>
      </div>

          </div>
          
        ))}
    
      
      </div></> ):("")
  
}
</div>);
      
}
