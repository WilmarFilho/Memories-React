import './index.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../services/api';
import iconEdit from './assets/edit.svg'
import iconDelete from './assets/delete.svg'
import QRCodeComponent from '../services/qr';



export default function Home() {

    interface User {
        id: number;
        name: string;
        email: string;
        hash: string;
        created_at: string;
        updated_at: string;
    }

    interface Page {
        id: number;
        created_at: string;
        updated_at: string;
        img_01: string;
        img_02: string;
        img_03: string;
        descricao: string;
        hash_id: string;
        user_id: number;
    }

    const [user, setUser] = useState<User | null>(null);
    const [paginas, setPaginas] = useState<Page[] | null>([]);

    const navigate = useNavigate();

    const RetornaPageAdd = () => {
        navigate("/nova-pagina");
    }

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

    return (
        <div className='WrapperDashboard'>
            <section className="dashboard row">

                <div className="col-10  col-md-9 col-lg-5 pages">
                    <div className='cardPages'>

                        {paginas ? paginas.map((pagina, index) => (
                            <div className='cardPage'>
                                <span>Página #1 - {pagina.descricao}</span>
                                <div className='iconsCard'>
                                    <img src={iconEdit} />
                                    <img src={iconDelete} />
                                </div>
                            </div>
                        )) : null}

                    </div>

                    <button onClick={RetornaPageAdd}>
                        Adicionar Nova Página <img></img>
                    </button>
                </div>

                <div className="col-10 col-md-9 col-lg-5 content-qr">
                    <h2>Compartilhe seu qr ou link com suas memorias </h2>
                    <QRCodeComponent userHash={user?.hash}></QRCodeComponent>
                </div>

            </section>
        </div>

    )
}