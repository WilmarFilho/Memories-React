import './assets/index.css';
import './assets/login.webp';
import useRegister from '../recoil/hooks/useRegister';

export default function Register() {

    const { nome, email, senha, erro, RetornaLogin, registrarUsuario, setSenha, setEmail, setNome } = useRegister()

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
