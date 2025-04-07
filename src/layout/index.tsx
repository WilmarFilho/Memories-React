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
            {(location.pathname === '/nova-pagina' || location.pathname === '/dashboard') && (
                <Header></Header>
            )}

            <main>
                <Outlet /> {/* Aqui as páginas serão renderizadas */}
            </main>
            {(location.pathname === '/nova-pagina' || location.pathname === '/dashboard') && (
                <Footer />
            )}


        </div>
    );
};

