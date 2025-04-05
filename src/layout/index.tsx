import React from 'react';
import Header from './header';
import Footer from './footer';
import './index.css';
import { useLocation, useNavigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';



export default function Layout() {


    const location = useLocation();

    return (
        <div>
            {location.pathname !== '/login' && location.pathname !== '/register' ? (
                <Header></Header>
            ) : null}

            <main>
                <Outlet /> {/* Aqui as páginas serão renderizadas */}
            </main>
            {location.pathname !== '/login' && location.pathname !== '/register' ? (
                <Footer></Footer>
            ) : null}


        </div>
    );
};

