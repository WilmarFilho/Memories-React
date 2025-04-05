import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import './assets/page.webp';


export default function CustomPage() {

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

    const { hash } = useParams<{ hash: string }>();
    const [paginas, setPaginas] = useState<Page[] | null>([]);


    useEffect(() => {
        if (hash) {
            const rota = '/pages/' + hash;

            api.get(rota)
                .then((response) => setPaginas(response.data));
        }
    }, [hash]);

    return (
        <div className='customPage'>

            {paginas ?  paginas.map((pagina, index) => (
                <h1>{pagina.descricao}</h1>
            )) : null}

        </div>
    )
}