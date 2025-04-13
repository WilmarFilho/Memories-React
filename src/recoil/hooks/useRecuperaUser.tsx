import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState, authState } from '../atoms';
import api from '../../services/api';

export default function useRecuperaUser() {
  const setUser = useSetRecoilState(userState);
  const setAuthState = useSetRecoilState(authState);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get('/user');
        setUser(data);
      } catch (error) {
        console.error('Erro ao recuperar usuário:', error);
        setAuthState({ token: '', authenticated: false })
        localStorage.removeItem('token');
        localStorage.removeItem('auth');

        setTimeout(() => {
          navigate('login');
        }, 2000)
        
        
      }
    };

    fetchUser();
    
  }, [setUser]);
}
