
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import iconEdit from './assets/edit.svg'
import iconDelete from './assets/delete.svg'
import addMain from './assets/addMainPage.svg'
import './index.css';

import QRCodeComponent from '../services/qr';
import api from '../services/api';

import FeedbackModal from '../components/FeedBackModal/FeedbackModal';

import Page from '../types/page';
import User from '../types/user';



export default function Home() {
    
    const location = useLocation();

    const [user, setUser] = useState<User | null>(null);
    const [paginas, setPaginas] = useState<Page[] | null>([]);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        api.get('/user')
            .then((response) => setUser(response.data))
            .catch(() => console.log('Erro'));
    }, []);

    useEffect(() => {
        if (user) {

            const rota = '/pages/' + user.hash;

            api.get(rota)
                .then((response) => setPaginas(response.data));
        }
    }, [user]);

    const feedback = location.state?.feedback;

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

    const navigate = useNavigate();

    const RetornaPageAdd = () => {
        navigate("/nova-pagina");
    }

   
    return (
        <div className='WrapperDashboard'>
            <div>
                {modalMessage && (
                    <FeedbackModal
                        message={modalMessage}
                        onClose={() => setModalMessage('')}
                    />
                )}

                {/* resto do seu dashboard */}
            </div>

            <section className="dashboard row">

                <div className="col-12  col-md-9 col-lg-5 pages">
                    <div className='cardPages'>

                        {paginas ? paginas.map((pagina, index) => (
                            <div className='cardPage' key={pagina.id} >
                                <div className='cardPages' onClick={() => {
                                    // redirecionar para rota de edição com userHash e pageId
                                    navigate(`/nova-pagina/${user?.hash}/${pagina.id}`);
                                }} >
                                    <span>Página #{index + 1}</span>
                                    <span>{pagina.descricao.slice(0, 25)}{pagina.descricao.length > 40 ? '  ...' : ''}</span>
                                </div>


                                <div className='iconsCard'>
                                    <img
                                        src={iconEdit}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            // redirecionar para rota de edição com userHash e pageId
                                            navigate(`/nova-pagina/${user?.hash}/${pagina.id}`);
                                        }}
                                    />
                                    <img
                                        src={iconDelete}
                                        style={{ cursor: 'pointer' }}
                                        onClick={async () => {
                                            const confirm = window.confirm('Deseja realmente deletar esta página?');
                                            if (!confirm) return;

                                            try {
                                                await api.delete(`/page/${pagina.id}`);
                                                alert('Página deletada com sucesso!');
                                                // Remove do estado local para atualizar a lista sem recarregar
                                                const novaLista = paginas.filter((p) => p.id !== pagina.id);
                                                setPaginas(novaLista);
                                            } catch (err) {
                                                alert('Erro ao deletar a página.');
                                                console.error(err);
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        )) : null}


                    </div>

                    <button onClick={RetornaPageAdd}>
                        Adicionar Página <img className='addMainSvg' src={addMain} />
                    </button>
                </div>

                {paginas && paginas.length > 0 ? <div className="col-12 col-md-9 col-lg-5 content-qr">
                    <h2>Compartilhe seu qr ou link com suas memorias </h2>
                    <QRCodeComponent userHash={user?.hash}></QRCodeComponent>
                </div> : <div style={{height: '250px'}} className="col-12 col-md-9 col-lg-5 content-qr"><h2 style={{textAlign: 'center'}}>Adicione sua primeira página e compartilhe seu qr ou link com suas memorias </h2></div> }



            </section>
        </div>

    )
}