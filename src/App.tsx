import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/index';
import Login from './pages/login';
import Register from './pages/register';
import PrivateRoute from './PrivateRoute';
import Home from './pages/home';
import CustomPage from './pages/customPage';
import Newpage from './pages/newPage';



function App() {
  return (
    <Router>
      <Routes>


        <Route path="/" element={<Navigate to="/login" />} />

        <Route path='/' element={<Layout />}>

          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <Home></Home>
              </PrivateRoute>}
          />

          <Route
            path='/nova-pagina'
            element={
              <PrivateRoute>
                <Newpage></Newpage>
              </PrivateRoute>}
          />

         
          <Route path="/register" element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path="/pagina/:hash" element={<CustomPage />} />

        </Route>

      </Routes>
    </Router>
  );
}

export default App;
