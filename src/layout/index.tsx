import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';

//Estilo
import './assets/index.css';

//Estados
import { authState } from '../recoil/atoms';

//Components
const Header = lazy(() => import('./header/header'));
const Footer = lazy(() => import('./footer/footer'));

export default function Layout() {
  const auth = useRecoilValue(authState);
  const location = useLocation();

  const layoutPaths = ['/nova-pagina', '/dashboard'];
  const showLayout =
    auth.authenticated &&
    layoutPaths.some((path) => location.pathname.startsWith(path));

  return (
    <Suspense fallback={<div>.</div>}>
      <div>
        {showLayout && <Header />}

        <main>
          <Outlet />
        </main>

        {showLayout && <Footer />}
      </div>
    </Suspense>
  );
}
