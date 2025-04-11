import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import Page from '../../types/page';
import { useRecoilState } from 'recoil';
import {
  imagesState,
  filesState,
  descricaoState,
  errorState,
  fieldErrorsState,
} from '../atoms';

export default function useEditaOuAdiciona() {
  const { userHash, pageId } = useParams<{ userHash: string; pageId: string }>();

  const [images, setImages] = useRecoilState(imagesState);
  const [files, setFiles] = useRecoilState(filesState);
  const [descricao, setDescricao] = useRecoilState(descricaoState);
  const [, setErro] = useRecoilState(errorState);
  const [, setFieldErrors] = useRecoilState(fieldErrorsState);

  useEffect(() => {
    const limparCampos = () => {
      setDescricao('');
      setImages([null, null, null]);
      setFiles([null, null, null]);
      setErro('');
      setFieldErrors({});
    };

    const carregarPagina = async () => {
      try {
        const { data: paginas } = await api.get(`/pages/${userHash}`);
        const pagina = paginas.find((p: Page) => p.id === Number(pageId));

        if (pagina) {
          setDescricao(pagina.descricao);
          setImages([
            `https://apimemories.celleta.com/${pagina.img_01}`,
            `https://apimemories.celleta.com/${pagina.img_02}`,
            `https://apimemories.celleta.com/${pagina.img_03}`,
          ]);
          setFiles([null, null, null]); // Para garantir que os arquivos só sejam enviados se alterados
        }
      } catch (err) {
        console.error('Erro ao carregar página:', err);
        limparCampos();
      }
    };

    if (userHash && pageId) {
      carregarPagina();
    } else {
      limparCampos();
    }
  }, [userHash, pageId]);
}
