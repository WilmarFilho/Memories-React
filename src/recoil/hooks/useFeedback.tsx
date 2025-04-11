import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function useFeedback(feedback: string) {
    
  const navigate = useNavigate();
  const location = useLocation(); 
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);

    if (feedback === "criado") {
      setModalMessage("Página criada com sucesso!");
      navigate(location.pathname, { replace: true });
    } else if (feedback === "editado") {
      setModalMessage("Página editada com sucesso!");
      navigate(location.pathname, { replace: true });
    }
  }, [feedback]);

  return {
    modalMessage,
    setModalMessage,
  };
}
