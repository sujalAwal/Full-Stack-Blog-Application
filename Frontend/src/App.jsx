import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Signup';
import Navbar from './component/Navbar';
import CreatePost from './component/crudComponent/CreatePost';
import Try from './component/Try';
import Home from './component/Home';
import Logout from './component/Logout';
import Guest from './component/Guest';
import ViewSinglePost from './component/crudComponent/ViewSinglePost';
import DeletePost from './component/crudComponent/DeletePost';
import EditPost from './component/crudComponent/EditPost';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/viewPost/:id" element={<ViewSinglePost />} />
          <Route path="/editPost/:id" element={<EditPost />} />
          <Route path="/deletePost/:id" element={<DeletePost />} />
          <Route path="/index" element={<Home />} />
          <Route path='/'element={<Guest/>} />
          <Route path="/try" element={<Try />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
