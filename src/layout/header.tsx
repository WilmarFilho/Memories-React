import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {

    const navigate = useNavigate();
    const location = useLocation();


    const retornaHome = () => {
        navigate("/dashboard");
    }

    const showLayout = (
        location.pathname.startsWith('/nova-pagina')
    );

    return (
        <header className="d-flex">

            <div className="col-4 content-Logo">
                <a href='/dashboard'><h2>Memories</h2></a>
            </div>

            <div className="col-8 content-NavHeader ">
                {showLayout && <button onClick={retornaHome}>Voltar</button>}
            </div>

        </header>
    )
};