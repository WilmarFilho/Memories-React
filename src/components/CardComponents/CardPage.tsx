import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { paginasState, userState } from '../../recoil/atoms';
import api from '../../services/api';

import CardItem from './CardItem';
import './index.css';

export default function CardPage() {
  const [paginas, setPaginas] = useRecoilState(paginasState);
  const [user] = useRecoilState(userState);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Deseja realmente deletar esta página?');
    if (!confirmDelete) return;

    try {
      await api.delete(`/page/${id}`);
      alert('Página deletada com sucesso!');
      const novaLista = paginas.filter((p) => p.id !== id);
      setPaginas(novaLista);
    } catch (err) {
      alert('Erro ao deletar a página.');
      console.error(err);
    }
  };

  return (
    <div className="cardPages" tabIndex={0}>
      {paginas?.map((pagina, index) => (
        <CardItem
          key={pagina.id}
          id={pagina.id}
          descricao={pagina.descricao}
          index={index}
          userHash={user?.hash || ''}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
