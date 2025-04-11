import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Outlet } from 'react-router-dom';
//Components
import Header from './header';
import Footer from './footer';
//Estilo
import './assets/index.css';
//Estados
import { authState } from '../recoil/atoms';

export default function Layout() {
  const auth = useRecoilValue(authState);
  const location = useLocation();

  const layoutPaths = ['/nova-pagina', '/dashboard'];
  const showLayout =
    auth.authenticated &&
    layoutPaths.some((path) => location.pathname.startsWith(path));

  return (
    <div>
      {showLayout && <Header />}

      <main>
        <Outlet />
      </main>

      {showLayout && <Footer />}
    </div>
  );
}
