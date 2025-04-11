//Estilos
import './assets/index.css';

//Assets
import './assets/login.webp';

//Hooks
import useRegister from '../recoil/hooks/useRegister';

export default function Register() {

    const { nome, email, senha, erro, RetornaLogin, registrarUsuario, setSenha, setEmail, setNome } = useRegister()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        registrarUsuario();
    };

    return (
        <section className="register">
            <article className='col-12 col-md-9 col-lg-6'>
                <div className='titles'>
                    <h1>Crie sua conta</h1>
                    <p>E começe a criar agora</p>
                </div>

                <form
                    className='inputs'
                    onSubmit={handleSubmit}
                >
                    <div className='contentInput'>
                        <label htmlFor='nome'>Digite seu nome completo</label>
                        <input
                            id='nome'
                            type='text'
                            placeholder='Danilo Alves Santos'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>
                    <div className='contentInput'>
                        <label htmlFor='email'>Digite seu email :</label>
                        <input
                            id='email'
                            type='email'
                            placeholder='daniloalmeida32@hotmail.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='contentInput'>
                        <label htmlFor='senha'>Digite sua senha :</label>
                        <input
                            id='senha'
                            type='password'
                            placeholder='********'
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>

                    {erro && <p style={{ color: 'red', marginTop: '10px' }}>{erro}</p>}

                    <div className='contentSubmitt'>
                        <button type='submit'>
                            Criar conta
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
