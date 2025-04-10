import { useLocation, useNavigate } from "react-router-dom";
import useLogout from "../recoil/hooks/useLogout";

export default function Header() {

    const navigate = useNavigate();
    const location = useLocation();


    const retornaHome = () => {
        navigate("/dashboard");
    }

    const logout = useLogout();
       

    const showVoltarLayout = (
        location.pathname.startsWith('/nova-pagina')
    );

    const showSairLayout = (
        location.pathname === '/dashboard'
    );

    return (
        <header className="d-flex">

            <div className="col-4 content-Logo">
                <a href='/dashboard'><h2>Memories</h2></a>
            </div>

            <div className="col-8 content-NavHeader ">
                {showVoltarLayout && <button onClick={retornaHome}>Voltar</button>}
                {showSairLayout && <button onClick={logout}>Sair</button>}
            </div>

        </header>
    )
};