import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { userState } from '../atoms'
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function useRecuperaUser() {
    const setUser = useSetRecoilState(userState)
    const navigate = useNavigate()

     useEffect(() => {
        api.get('/user')
          .then((response) => setUser(response.data))
          .catch(() => console.log('Erro'));
      }, []);
}
