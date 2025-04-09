import './index.css';
import './assets/login.webp';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import api from '../services/api';

export default function Register() {
    const navigate = useNavigate();

    const RetornaLogin = () => {
        navigate("/login");
    };

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [loading, setLoading] = useState(false);

    const validarCampos = () => {
        if (!nome || !email || !senha) {
            setErro("Preencha todos os campos.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErro("Email inválido.");
            return false;
        }

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
            setLoading(true);

            const resposta = await api.post('/register', {
                name: nome,
                email: email,
                password: senha,
            });

            // Se quiser, já salva o token e redireciona direto:
            const { access_token } = resposta.data;
            localStorage.setItem('token', access_token);

            navigate('/dashboard'); // ou 'login' se preferir
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const mensagem = error.response?.data?.mensagem || "Erro ao registrar. Tente novamente.";
                setErro(mensagem);
            } else {
                setErro("Erro inesperado. Verifique sua conexão.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="login">
            <article className='col-12 col-md-9 col-lg-6'>
                <div className='titles'>
                    <h1>Crie sua conta</h1>
                    <p>E começe a criar agora</p>
                </div>

                <form
                    className='inputs'
                    onSubmit={(e) => {
                        e.preventDefault();
                        registrarUsuario();
                    }}
                >
                    <div className='contentInput'>
                        <label>Digite seu nome completo</label>
                        <input
                            type='text'
                            placeholder='Danilo Alves Santos'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>
                    <div className='contentInput'>
                        <label>Digite seu email :</label>
                        <input
                            type='email'
                            placeholder='daniloalmeida32@hotmail.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='contentInput'>
                        <label>Digite sua senha :</label>
                        <input
                            type='password'
                            placeholder='••••••••'
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>

                    {erro && <p style={{ color: 'red', marginTop: '10px' }}>{erro}</p>}

                    <div className='contentSubmitt'>
                        <button type='submit' disabled={loading}>
                            {loading ? 'Criando...' : 'Criar conta'}
                        </button>
                    </div>

                    <p className='rodapeLogin'>
                        Já tem uma conta? <span onClick={RetornaLogin}>Entre Agora</span>
                    </p>
                </form>
            </article>
        </section>
    );
}
