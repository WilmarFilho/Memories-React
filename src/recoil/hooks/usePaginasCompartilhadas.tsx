import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil'
import { paginasState } from '../atoms'
import api from '../../services/api';

export default function usePaginasCompartilhadas() {

    const setPaginas = useSetRecoilState(paginasState)
    const { hash } = useParams<{ hash: string }>();


    useEffect(() => {
        if (hash) {
            api.get(`/pages/${hash}`)
                .then((response) => setPaginas(response.data))
                .catch((error) => console.error('Erro ao buscar páginas:', error));
        }
    }, [hash]);

}
