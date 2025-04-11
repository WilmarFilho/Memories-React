import './assets/index.css';
import './assets/login.webp';
import CookieConsent from '../components/Cookies/index';
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

  return (
    <section className="login">
      <article className='col-12 col-md-9 col-lg-6'>
        <div className='titles'>
          <h1>Faça Login</h1>
          <p>E começe a criar agora</p>
        </div>

        <form
          className="inputs"
          onSubmit={(e) => {
            e.preventDefault();
            autenticarUsuario();
          }}
        >
          <div className='contentInput'>
            <label>Digite seu email :</label>
            <input
              required
              type='email'
              placeholder='daniloalmeida32@hotmail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='contentInput'>
            <label>Digite sua senha :</label>
            <input
              required
              type='password'
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {erro && <p style={{ color: 'red', marginTop: '10px' }}>{erro}</p>}

          <div className='contentSubmitt'>
            <button onClick={autenticarUsuario}>ENTRAR</button>
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
