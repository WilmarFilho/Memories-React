import './index.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../services/api';

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
        <section className="home">

            <div className="col-6 pages">
                <div className='cardPages'>
                    <div className='cardPage'>Página #1</div>
                    <div className='cardPage'>Página #2</div>
                    <div className='cardPage'>Página #3</div>
                </div>

                <button>
                    Adicionar Nova Página <img></img>
                </button>
            </div>

            <div className="col-6 content-qr">
                <h2>Compartilhe seu qr ou link com suas memorias </h2>
                <img></img>
                <p>https://www.figma.com/design/NBrwdvj0ghWqlHZ18ZHjIl/Site---Memories?node-id=64-487&t=y47joXHX8ISv4tPU-0</p>
            </div>

        </section>
    )
}