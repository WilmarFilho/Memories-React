import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/index';
import Login from './pages/login';
import Register from './pages/register';
import PrivateRoute from './PrivateRoute';
import Home from './pages/home';
import CustomPage from './pages/customPage';
import Newpage from './pages/newPage';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = "107956742788-25vj17m0r48ao74o7n8b6ap82vhulnoi.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
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
              path='/nova-pagina/:userHash?/:pageId?'
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
    </GoogleOAuthProvider>
  );
}

export default App;
