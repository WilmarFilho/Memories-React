//Estilos
import './assets/index.css';

//Assets
import './assets/login.webp';

//Components
import CookieConsent from '../components/Cookies/index';

//Hooks
import useLogin from '../recoil/hooks/useLogin';

export default function Login() {

  const {
    email,
    setEmail,
    password,
    setPassword,
    erro,
    autenticarUsuario,
    goToRegister,
  } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    autenticarUsuario();
  };

  return (
    <section className="login">
      <article className='col-12 col-md-9 col-lg-6'>
        <div className='titles'>
          <h1>Faça Login</h1>
          <p>E começe a criar agora</p>
        </div>

        <form
          className="inputs"
          onSubmit={handleSubmit}
        >
          <div className='contentInput'>
            <label htmlFor='email'>Digite seu email :</label>
            <input
              id='email'
              required
              type='email'
              placeholder='daniloalmeida32@hotmail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='contentInput'>
            <label htmlFor='senha'>Digite sua senha :</label>
            <input
              id='senha'
              required
              type='password'
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {erro && <p style={{ color: 'red', marginTop: '10px' }}>{erro}</p>}

          <div className='contentSubmitt'>
            <button type='submit'>ENTRAR</button>
          </div>
          <p className='rodapeLogin'>
            Não tem uma conta? <span onClick={goToRegister}>Crie Agora</span>
          </p>
        </form>
      </article>
      <CookieConsent />
    </section>
  );
}
