import api from "../../services/api";
import { useSetRecoilState } from "recoil";
import { authState } from "../atoms";


export default function useLogout() {

  const setAuth = useSetRecoilState(authState)

  const logout = async () => {
    try {
      
      await api.post('/logout');

      localStorage.removeItem('auth');

      setAuth({ token: '', authenticated: false });

    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return logout;
}
