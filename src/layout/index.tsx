import Header from './header';
import Footer from './footer';
import './index.css';
import { useLocation } from "react-router-dom";
import { Outlet } from 'react-router-dom';



export default function Layout() {


    const location = useLocation();
    const showLayout = (
        location.pathname.startsWith('/nova-pagina') ||
        location.pathname === '/dashboard'
    );

    return (
        <div>
            {showLayout && <Header />}

            <main>
                <Outlet /> 
            </main>

            {showLayout && <Footer />}

        </div>
    );
};

