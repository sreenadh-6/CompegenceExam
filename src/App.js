// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import PostDetails from './PostDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<PostDetails />} />
    </Routes>
  );
}

export default App;
