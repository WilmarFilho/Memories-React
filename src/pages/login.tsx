import './index.css';
import logo from './assets/a.svg';
import './assets/login.webp';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function Login() {

    const navigate = useNavigate();

    const RetornaRegistro = () => {
        navigate("/register");
    }



    return (
        <section className="login ">
            <article className='col-12 col-md-9 col-lg-6 '>
                <div className='titles'>
                    <h1>Faça Login</h1>
                    <p>E começe a criar agora</p>
                </div>

                <div className='inputs'>

                    <div className='contentInput'>
                        <label>Digite seu email :</label>
                        <input type='text' placeholder='daniloalmeida32@hotmail.com'></input>
                    </div>
                    <div className='contentInput'>
                        <label>Digite sua senha :</label>
                       
                            <input  type='password' placeholder='daniloalmeida32@hotmail.com'></input>
                  
                      

                    </div>
                    <div className='contentSubmitt'>
                        <button>ENTRAR</button>
                    </div>
                    <p className='rodapeLogin'>Não tem uma conta? <span onClick={RetornaRegistro}>Crie Agora</span></p>
                </div>

            </article>
        </section>

    )
};