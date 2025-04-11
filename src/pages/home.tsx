import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { paginasState, userState } from '../recoil/atoms';

import usePaginasUsuarios from '../recoil/hooks/usePaginasUsuarios';
import useRecuperaUser from '../recoil/hooks/useRecuperaUser';

import './assets/index.css';

import FeedbackModal from '../components/FeedBackModal/FeedbackModal';
import CardPageList from '../components/CardPage/index';
import ButtonMain from '../components/Buttons';
import NotFound from '../components/NotFound';
import CardQr from '../components/CardQr';
import useFeedback from '../recoil/hooks/useFeedback';

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const paginas = useRecoilValue(paginasState);

  const feedback = location.state?.feedback;

  const {modalMessage, setModalMessage} = useFeedback(feedback);

  usePaginasUsuarios()

  useRecuperaUser()

  return (
    <div className='WrapperDashboard'>
      {modalMessage && (
        <FeedbackModal message={modalMessage} onClose={() => setModalMessage('')} />
      )}

      <section className="dashboard row">
        <div className="col-12  col-md-9 col-lg-5 pages">

          <CardPageList />

          <ButtonMain onClick={() => {
            navigate("/nova-pagina");
          }} />

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
