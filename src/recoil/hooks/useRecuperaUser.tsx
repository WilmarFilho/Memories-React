import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState } from '../atoms';
import api from '../../services/api';

export default function useRecuperaUser() {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get('/user');
        setUser(data);
      } catch (error) {
        console.error('Erro ao recuperar usuário:', error);
      }
    };

    fetchUser();
  }, [setUser]);
}
