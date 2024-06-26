import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const userId = sessionStorage.getItem('user');

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('id', userId);
    formData.append('ispublish',selectedOption);
    if (image) {
      formData.append('img', image);
    }

    try {
      console.log(image);
      const response = await axios.post('http://127.0.0.1:8000/api/store', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization":`Bearer ${sessionStorage.getItem('jwtToken')}`
        },
        
      });
      setMessage(response.data.message);
      console.log(response.data);
      console.log(userId.id);
      if(response.data.message == "Post created successfully"){


        setMessage(`"Congratulations! Your blog post titled '${title}' has been successfully uploaded . `)
      setTitle('');
      setBody('');
      setSelectedOption(null);
      setImage();
     
      }
    } catch (error) {
      setMessage('Error creating post');
    }
  };

    const [selectedOption, setSelectedOption] = useState(null);
  
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
    if(sessionStorage.getItem('jwtToken')){
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Create Post</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Body</label>
          <textarea
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={handleImageChange} accept='image/*'
          />
        </div>
        <div className="mb-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Select an Option</h2>
        <div>
          <label  className="ml-2 block text-gray-700">
            <input  className="mt-1  px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="radio"
              value="published"
              checked={selectedOption === 'published'}
              onChange={handleOptionChange}
           required />
            Published
          </label>
        </div>
        <div>
          <label className="ml-2 block text-gray-700">
            <input  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              type="radio"
              value="draft"
              checked={selectedOption === 'draft'}
              onChange={handleOptionChange}
            />
            Draft
          </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Post
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );}else{
    return(
      <div>
        <h1>Access Denied</h1>
      </div>
    )
  }
}


export default CreatePost;
