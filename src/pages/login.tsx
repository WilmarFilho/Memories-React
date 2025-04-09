import './index.css';
import './assets/login.webp';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../services/api';




export default function Login() {

  const navigate = useNavigate();

  const RetornaRegistro = () => {
    navigate("/register");
  }

  // Se já estiver logado, redireciona para o dashboard
  /*useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, []);*/

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  const autenticarUsuario = async () => {
    try {
      const resposta = await api.post('/login', {
        email,
        password
      });

      // Supondo que a API retorne um token ou user
      const { access_token } = resposta.data;

      // Salva o token no localStorage
      localStorage.setItem('token', access_token);
      navigate('/dashboard'); // redireciona após login

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setErro('Email ou senha incorretos.');
        } else {
          setErro(error.response?.data?.mensagem || 'Erro ao fazer login. Tente novamente.');
        }
      } else {
        setErro('Erro inesperado. Verifique sua conexão.');
      }
    }
  };



  return (
    <section className="login ">
      <article className='col-12 col-md-9 col-lg-6 '>
        <div className='titles'>
          <h1>Faça Login</h1>
          <p>E começe a criar agora</p>
        </div>

        <form
          className="inputs"
          onSubmit={(e) => {
            e.preventDefault(); // evita o recarregamento da página
            autenticarUsuario(); // chama sua função de login
          }}
        >

          <div className='contentInput'>
            <label>Digite seu email :</label>
            <input required type='email'
              placeholder='daniloalmeida32@hotmail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}></input>
          </div>
          <div className='contentInput'>
            <label>Digite sua senha :</label>

            <input required type='password'
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}></input>
          </div>

          {erro && <p style={{ color: 'red', marginTop: '10px' }}>{erro}</p>}

          <div className='contentSubmitt'>
            <button onClick={autenticarUsuario}>ENTRAR</button>
          </div>
          <p className='rodapeLogin'>Não tem uma conta? <span onClick={RetornaRegistro}>Crie Agora</span></p>
        </form>

      </article>
    </section>

  )
};