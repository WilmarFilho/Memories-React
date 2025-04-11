import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Page from '../../types/page';
import { useRecoilState } from 'recoil';
import { imagesState, filesState, descricaoState, errorState, fieldErrorsState } from '../atoms';

export default function useEditaOuAdiciona() {

    const { userHash, pageId } = useParams<{ userHash: string; pageId: string }>();
    const [images, setImages] = useRecoilState(imagesState);
    const [files, setFiles] = useRecoilState(filesState);
    const [descricao, setDescricao] = useRecoilState(descricaoState);
    const [error, setErro] = useRecoilState(errorState);
    const [fieldErrors, setFieldErrors] = useRecoilState(fieldErrorsState);

    useEffect(() => {
        if (userHash && pageId) {
            // Caso esteja editando uma página, buscar os dados
            api.get(`/pages/${userHash}`).then((res) => {
                const paginas = res.data;
                const pagina = paginas.find((p: Page) => p.id === Number(pageId));
                if (pagina) {
                    setDescricao(pagina.descricao);
                    setImages([
                        `https://apimemories.celleta.com/${pagina.img_01}`,
                        `https://apimemories.celleta.com/${pagina.img_02}`,
                        `https://apimemories.celleta.com/${pagina.img_03}`,
                    ]);
                    setFiles([null, null, null]); // Garante que os arquivos serão enviados apenas se forem trocados
                }
            });
        } else {
            // Caso esteja criando nova página, limpar os dados anteriores
            setDescricao('');
            setImages([null, null, null]);
            setFiles([null, null, null]);
            setErro('');
            setFieldErrors({});
        }
    }, [userHash, pageId]);
}