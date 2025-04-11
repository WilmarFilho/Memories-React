import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import iconEdit from './assets/edit.svg';
import iconDelete from './assets/delete.svg';

interface Props {
  id: number;
  descricao: string;
  index: number;
  userHash: string;
  onDelete: (id: number) => void;
}

function CardItem({ id, descricao, index, userHash, onDelete }: Props) {
  const navigate = useNavigate();

  return (
    <div className="cardPage">
      <div
        className="cardPages"
        onClick={() => navigate(`/nova-pagina/${userHash}/${id}`)}
      >
        <span>Página #{index + 1}</span>
        <span>
          {descricao.slice(0, 25)}
          {descricao.length > 40 ? ' ...' : ''}
        </span>
      </div>

      <div className="iconsCard">
        <img
          src={iconEdit}
          alt="Editar"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(`/nova-pagina/${userHash}/${id}`)}
        />
        <img
          src={iconDelete}
          alt="Excluir"
          style={{ cursor: 'pointer' }}
          onClick={() => onDelete(id)}
        />
      </div>
    </div>
  );
}

export default memo(CardItem);
