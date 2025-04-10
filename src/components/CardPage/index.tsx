import { useRecoilState } from 'recoil';
import { paginasState, userState } from '../../recoil/atoms';
import iconEdit from '../../pages/assets/edit.svg';
import api from '../../services/api';
import iconDelete from '../../pages/assets/delete.svg';
import { useNavigate } from 'react-router-dom';




export default function CardPage() {

    const [paginas, setPaginas] = useRecoilState(paginasState);
    const [user] = useRecoilState(userState);
    const navigate = useNavigate();


    return (
        <div className='cardPages'>

            {paginas ? paginas.map((pagina, index) => (
                <div className='cardPage' key={pagina.id} >
                    <div className='cardPages' onClick={() => {
                        // redirecionar para rota de edição com userHash e pageId
                        navigate(`/nova-pagina/${user?.hash}/${pagina.id}`);
                    }} >
                        <span>Página #{index + 1}</span>
                        <span>{pagina.descricao.slice(0, 25)}{pagina.descricao.length > 40 ? '  ...' : ''}</span>
                    </div>


                    <div className='iconsCard'>
                        <img
                            src={iconEdit}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                // redirecionar para rota de edição com userHash e pageId
                                navigate(`/nova-pagina/${user?.hash}/${pagina.id}`);
                            }}
                        />
                        <img
                            src={iconDelete}
                            style={{ cursor: 'pointer' }}
                            onClick={async () => {
                                const confirm = window.confirm('Deseja realmente deletar esta página?');
                                if (!confirm) return;

                                try {
                                    await api.delete(`/page/${pagina.id}`);
                                    alert('Página deletada com sucesso!');
                                    // Remove do estado local para atualizar a lista sem recarregar
                                    const novaLista = paginas.filter((p) => p.id !== pagina.id);
                                    setPaginas(novaLista);
                                } catch (err) {
                                    alert('Erro ao deletar a página.');
                                    console.error(err);
                                }
                            }}
                        />
                    </div>
                </div>
            )) : null}


        </div>
    )
}