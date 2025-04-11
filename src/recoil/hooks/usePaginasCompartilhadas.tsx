import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil'
import { paginasState } from '../atoms'
import api from '../../services/api';

export default function usePaginasCompartilhadas() {

    const setPaginas = useSetRecoilState(paginasState)
    const { hash } = useParams<{ hash: string }>();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (hash) {
            api.get(`/pages/${hash}`)
                .then((response) => {
                    setPaginas(response.data)
                    setLoading(false);
        })
                .catch((error) =>  setPaginas([]));
        }
        
    }, [hash]);

    return loading;

}
