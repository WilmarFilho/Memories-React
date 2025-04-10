import User from '../../types/user';
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userState } from '../atoms'
import api from '../../services/api';

export default function useRecuperaUser() {
    const setUser = useSetRecoilState(userState)

     useEffect(() => {
        api.get('/user')
          .then((response) => setUser(response.data))
          .catch(() => console.log('Erro'));
      }, []);
}
