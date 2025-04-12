// Libs
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';

// Estados globais
import { paginasState, userState } from '../../recoil/atoms';

// Hooks personalizados
import usePaginasUsuarios from '../../recoil/hooks/usePaginasUsuarios';
import useRecuperaUser from '../../recoil/hooks/useRecuperaUser';
import useFeedback from '../../recoil/hooks/useFeedback';

// Componentes
import FeedbackModal from '../../components/FeedBackModal/FeedbackModal';
import CardPageList from '../../components/CardComponents/CardPage';
import ButtonMain from '../../components/Buttons';
import NotFound from '../../components/NotFound';
import CardQr from '../../components/CardQr';

// Estilos
import './index.css';


export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const paginas = useRecoilValue(paginasState);

  const feedback = location.state?.feedback;

  const { modalMessage, setModalMessage } = useFeedback(feedback);


  useRecuperaUser();
  usePaginasUsuarios();


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
