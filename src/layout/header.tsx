import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {

    const navigate = useNavigate();
    const location = useLocation();


    const retornaHome = () => {
        navigate("/");
    }

    return (
        <header className="d-flex">

            <div className="col-4 content-Logo">
                <a href='https://memorias.framer.website'><h2>Memories</h2></a>
            </div>

            <div className="col-8 content-NavHeader ">
                {location.pathname === '/resultado' ? (
                    <button onClick={retornaHome}>Voltar</button>
                ) : null}
            </div>

        </header>
    )
};