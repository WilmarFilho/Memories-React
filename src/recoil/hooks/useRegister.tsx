import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authState } from '../atoms';
import { useSetRecoilState } from 'recoil';

import api from '../../services/api';
import axios from 'axios';

export default function useRegister() {
    const navigate = useNavigate();

    const RetornaLogin = () => {
        navigate("/login");
    };

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const setAuth = useSetRecoilState(authState);

    const validarCampos = () => {

        if (senha.length < 8) {
            setErro("A senha deve conter pelo menos 8 caracteres.");
            return false;
        }

        const temMaiuscula = /[A-Z]/.test(senha);
        if (!temMaiuscula) {
            setErro("A senha deve conter pelo menos uma letra maiúscula.");
            return false;
        }

        setErro('');
        return true;

    };


    const registrarUsuario = async () => {
        if (!validarCampos()) return;

        try {

            const resposta = await api.post('/register', {
                name: nome,
                email: email,
                password: senha,
            });


            const dados = await api.post('/login', {
                email: email,
                password: senha,
            });

            const { access_token } = dados.data;

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


                let mensagem = "Erro ao registrar. Tente novamente.";

                if (error.response?.data.message == 'The email has already been taken.') {
                    mensagem = 'E-mail já cadastrado'
                }

                setErro(mensagem);

            } else {
                setErro("Erro inesperado. Verifique sua conexão.");
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
        registrarUsuario
    }
}
