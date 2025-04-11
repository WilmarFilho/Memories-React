import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function useFeedback(feedback: string) {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    if (!feedback) return;

    window.scrollTo(0, 0);

    const mensagens: Record<string, string> = {
      criado: 'Página criada com sucesso!',
      editado: 'Página editada com sucesso!',
    };

    const mensagem = mensagens[feedback];
    if (mensagem) {
      setModalMessage(mensagem);
      // Remove o parâmetro da URL para evitar múltiplas execuções
      navigate(location.pathname, { replace: true });
    }
  }, [feedback, location.pathname, navigate]);

  return {
    modalMessage,
    setModalMessage,
  };
}
