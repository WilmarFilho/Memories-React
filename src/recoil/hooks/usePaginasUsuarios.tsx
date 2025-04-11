import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState, paginasState } from '../atoms';
import api from '../../services/api';

export default function usePaginasUsuarios() {
  const user = useRecoilValue(userState);
  const setPaginas = useSetRecoilState(paginasState);

  useEffect(() => {
    const fetchPaginas = async () => {
      if (!user?.hash) return;

      try {
        const response = await api.get(`/pages/${user.hash}`);
        setPaginas(response.data);
      } catch (error) {
        console.error('Erro ao buscar páginas do usuário:', error);
      }
    };

    fetchPaginas();
  }, [user, setPaginas]);
}
