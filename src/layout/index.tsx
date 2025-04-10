import Header from './header';
import Footer from './footer';
import './assets/index.css';
import { useLocation } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/atoms';
import { Outlet } from 'react-router-dom';



export default function Layout() {

    const auth = useRecoilValue(authState)

    const location = useLocation();

    const layoutPaths = ['/nova-pagina', '/dashboard'];
    const showLayout = auth.authenticated && layoutPaths.some(path => location.pathname.startsWith(path));

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

