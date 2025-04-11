import { useLocation, useNavigate } from 'react-router-dom';
import useLogout from '../recoil/hooks/useLogout';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();

  const isNovaPagina = location.pathname.startsWith('/nova-pagina');
  const isDashboard = location.pathname === '/dashboard';

  const handleGoHome = () => navigate('/dashboard');

  return (
    <header className="d-flex">
      <div className="col-4 content-Logo">
        <a href="/dashboard">
          <h2>Memories</h2>
        </a>
      </div>

      <div className="col-8 content-NavHeader">
        {isNovaPagina && <button onClick={handleGoHome}>Voltar</button>}
        {isDashboard && <button onClick={logout}>Sair</button>}
      </div>
    </header>
  );
}
