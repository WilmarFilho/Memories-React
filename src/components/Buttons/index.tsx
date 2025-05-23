import addMain from './addMainPage.svg';
import './index.css'

interface Props {
    onClick: () => void;
    pageId?: string;
}

export default function ButtonMain({onClick, pageId} : Props ) {
    return (
        <button tabIndex={0} onClick={onClick}>
            {pageId ? 'Salvar Alterações' : 'Adicionar Página'}
            <img className='addMainSvg' src={addMain} />
        </button>
    )
}