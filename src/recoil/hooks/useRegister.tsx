import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';

import { authState } from '../atoms';
import api from '../../services/api';

export default function useRegister() {
    const navigate = useNavigate();
    const setAuth = useSetRecoilState(authState);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const RetornaLogin = () => navigate('/login');

    const validarCampos = () => {
        if (senha.length < 8) {
            setErro('A senha deve conter pelo menos 8 caracteres.');
            return false;
        }

        if (!/[A-Z]/.test(senha)) {
            setErro('A senha deve conter pelo menos uma letra maiúscula.');
            return false;
        }

        setErro('');
        return true;
    };

    const registrarUsuario = async () => {
        if (!validarCampos()) return;

        try {
            // Cadastra o usuário
            await api.post('/register', {
                name: nome,
                email,
                password: senha,
            });

            // Faz login automático
            const { data } = await api.post('/login', {
                email,
                password: senha,
            });

            const { access_token } = data;

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
                let mensagem = 'Erro ao registrar. Tente novamente.';

                if (error.response?.data.message === 'The email has already been taken.') {
                    mensagem = 'E-mail já cadastrado';
                }

                setErro(mensagem);
            } else {
                setErro('Erro inesperado. Verifique sua conexão.');
            }
        }
    };

    return {
        nome,
        setNome,
        email,
        setEmail,
        senha,
        setSenha,
        erro,
        RetornaLogin,
        registrarUsuario,
    };
}
