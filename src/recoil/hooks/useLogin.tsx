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
    if (auth.authenticated) {
      navigate('/dashboard');
    }
  }, []);

  const autenticarUsuario = async () => {
    try {
      const resposta = await api.post('/login', { email, password });
      const { access_token } = resposta.data;

      const authData = {
        token: access_token,
        authenticated: true,
      };

      localStorage.setItem('token', access_token);
      localStorage.setItem('auth', JSON.stringify(authData));

      setAuth(authData);
      navigate('/dashboard');
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
