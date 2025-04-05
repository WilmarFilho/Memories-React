import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/index';
import Login from './pages/login';
import Register from './pages/register';



function App() {
  return (
    <Router>
      <Routes>


        <Route path="/" element={<Navigate to="/login" />} />

        <Route path='/' element={<Layout />}>

          <Route path="/register" element={<Register />} />
          <Route path='login' element={<Login />}></Route>

        </Route>

      </Routes>
    </Router>
  );
}

export default App;
