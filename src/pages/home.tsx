import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { paginasState, userState } from '../recoil/atoms';

import addMain from './assets/addMainPage.svg';
import './index.css';

import QRCodeComponent from '../services/qr';
import api from '../services/api';
import FeedbackModal from '../components/FeedBackModal/FeedbackModal';
import CardPageList from '../components/CardPage/index';

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(userState);
  const [paginas, setPaginas] = useRecoilState(paginasState);
  const feedback = location.state?.feedback;
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    api.get('/user')
      .then((response) => setUser(response.data))
      .catch(() => console.log('Erro'));
  }, []);

  useEffect(() => {
    if (user) {
      api.get(`/pages/${user.hash}`).then((res) => setPaginas(res.data));
    }
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (feedback === "criado") {
      setModalMessage("Página criada com sucesso!");
      navigate(location.pathname, { replace: true });
    } else if (feedback === "editado") {
      setModalMessage("Página editada com sucesso!");
      navigate(location.pathname, { replace: true });
    }
  }, [feedback]);

  const RetornaPageAdd = () => {
    navigate("/nova-pagina");
  };

  return (
    <div className='WrapperDashboard'>
      {modalMessage && (
        <FeedbackModal message={modalMessage} onClose={() => setModalMessage('')} />
      )}

      <section className="dashboard row">
        <div className="col-12  col-md-9 col-lg-5 pages">
          <CardPageList />
          <button onClick={RetornaPageAdd}>
            Adicionar Página <img className='addMainSvg' src={addMain} />
          </button>
        </div>

        {paginas.length > 0 ? (
          <div className="col-12 col-md-9 col-lg-5 content-qr">
            <h2>Compartilhe seu qr ou link com suas memórias</h2>
            <QRCodeComponent userHash={user?.hash} />
          </div>
        ) : (
          <div style={{ height: '250px' }} className="col-12 col-md-9 col-lg-5 content-qr">
            <h2 style={{ textAlign: 'center' }}>
              Adicione sua primeira página e compartilhe seu QR ou link com suas memórias
            </h2>
          </div>
        )}
      </section>
    </div>
  );
}
