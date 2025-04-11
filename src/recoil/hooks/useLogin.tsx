import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';
import api from '../../services/api';
import { authState } from '../atoms';

export default function useLogin() {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);
  const auth = useRecoilValue(authState);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (auth?.authenticated) {
      navigate('/dashboard');
    }
  }, [auth, navigate]);

  const autenticarUsuario = async () => {
    setErro(''); // limpa erro anterior

    try {
      const { data } = await api.post('/login', { email, password });

      const authData = {
        token: data.access_token,
        authenticated: true,
      };

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('auth', JSON.stringify(authData));

      setAuth(authData);
      navigate('/dashboard');
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const mensagem = error.response?.data?.mensagem;

        if (status === 401) {
          setErro('Email ou senha incorretos.');
        } else {
          setErro(mensagem || 'Erro ao fazer login. Tente novamente.');
        }
      } else {
        setErro('Erro inesperado. Verifique sua conexão.');
      }
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    erro,
    autenticarUsuario,
    goToRegister: () => navigate('/register'),
  };
}
