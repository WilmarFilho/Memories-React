import './index.css';
import './assets/login.webp';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();

    const RetornaLogin = () => {
        navigate("/login");
    }


    return (
        <section className="login ">
            <article className='col-12 col-md-9 col-lg-6 '>
                <div className='titles'>
                    <h1>Crie sua conta</h1>
                    <p>E começe a criar agora</p>
                </div>

                <div className='inputs'>
                    <div className='contentInput'>
                        <label>Digite seu nome completo</label>
                        <input type='text' placeholder='wilmar jose alves ferreira filho'></input>
                    </div>
                    <div className='contentInput'>
                        <label>Digite seu email :</label>
                        <input type='text' placeholder='daniloalmeida32@hotmail.com'></input>
                    </div>
                    <div className='contentInput'>
                        <label>Digite sua senha :</label>
                        <input type='text' placeholder='daniloalmeida32@hotmail.com'></input>
                    </div>
                    <div className='contentSubmitt'>
                        <button>Criar conta</button>
                    </div>
                    <p className='rodapeLogin'>Já tem uma conta? <span onClick={RetornaLogin}> Entre Agora</span></p>
                </div>

            </article>
        </section>
    )
};