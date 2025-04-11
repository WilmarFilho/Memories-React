import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userState, paginasState } from '../atoms'
import api from '../../services/api';

export default function usePaginasUsuarios() {
    const user = useRecoilValue(userState)
    const setPaginas = useSetRecoilState(paginasState)

    useEffect(() => {
        if (user) {
            api.get(`/pages/${user.hash}`).then((res) => setPaginas(res.data));
        }
    }, [user])
}
