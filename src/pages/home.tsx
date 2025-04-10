import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { paginasState, userState } from '../recoil/atoms';

import addMain from './assets/addMainPage.svg';
import './assets/index.css';


import api from '../services/api';
import FeedbackModal from '../components/FeedBackModal/FeedbackModal';
import CardPageList from '../components/CardPage/index';
import ButtonMain from '../components/Buttons';
import NotFound from '../components/NotFound';
import CardQr from '../components/CardQr';

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

          <ButtonMain onClick={RetornaPageAdd} />

        </div>

        {paginas.length > 0 ? (
          <CardQr userHash={user?.hash} />
        ) : (
          <NotFound />
        )}
        
      </section>
    </div>
  );
}
