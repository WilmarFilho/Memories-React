import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { paginasState, userState } from '../../recoil/atoms';
import api from '../../services/api';

import iconEdit from './assets/edit.svg';
import iconDelete from './assets/delete.svg';

import './index.css';

export default function CardPage() {
  const [paginas, setPaginas] = useRecoilState(paginasState);
  const [user] = useRecoilState(userState);
  const navigate = useNavigate();

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
    <div className="cardPages">
      {paginas?.map((pagina, index) => (
        <div className="cardPage" key={pagina.id}>
          <div
            className="cardPages"
            onClick={() => navigate(`/nova-pagina/${user?.hash}/${pagina.id}`)}
          >
            <span>Página #{index + 1}</span>
            <span>
              {pagina.descricao.slice(0, 25)}
              {pagina.descricao.length > 40 ? ' ...' : ''}
            </span>
          </div>

          <div className="iconsCard">
            <img
              src={iconEdit}
              alt="Editar"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/nova-pagina/${user?.hash}/${pagina.id}`)}
            />
            <img
              src={iconDelete}
              alt="Excluir"
              style={{ cursor: 'pointer' }}
              onClick={() => handleDelete(pagina.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
