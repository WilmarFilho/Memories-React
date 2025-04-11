import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import api from '../../services/api';
import traduzirMensagem from '../../utils/tradutor';

import {
  imagesState,
  filesState,
  descricaoState,
  errorState,
  fieldErrorsState,
} from '../atoms';

export default function useAdicionaPage() {
  const navigate = useNavigate();
  const { pageId } = useParams<{ pageId: string }>();

  const [images, setImages] = useRecoilState(imagesState);
  const [files, setFiles] = useRecoilState(filesState);
  const [descricao] = useRecoilState(descricaoState);
  const [error, setErro] = useRecoilState(errorState);
  const [fieldErrors, setFieldErrors] = useRecoilState(fieldErrorsState);

  useEffect(() => {
    if (error || Object.keys(fieldErrors).length > 0) {
      const timer = setTimeout(() => {
        setErro('');
        setFieldErrors({});
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, fieldErrors]);

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || !selectedFiles[0]) return;

    const file = selectedFiles[0];
    const newImages = [...images];
    const newFiles = [...files];

    newImages[index] = URL.createObjectURL(file);
    newFiles[index] = file;

    setImages(newImages);
    setFiles(newFiles);
    e.target.value = ''; // limpa o input para permitir reupload do mesmo arquivo
  };

  const montarFormData = () => {
    const formData = new FormData();
    formData.append('descricao', descricao);
    files.forEach((file, index) => {
      if (file) formData.append(`img_0${index + 1}`, file);
    });
    return formData;
  };

  const handleSubmit = async () => {
    try {
      const formData = montarFormData();
      const endpoint = pageId ? `/page/${pageId}` : '/page/novo';

      await api.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/dashboard', {
        state: { feedback: pageId ? 'editado' : 'criado' },
      });
    } catch (err: any) {
      window.scrollTo(0, 0);

      if (err.response?.data?.message) {
        setErro(err.response.data.message);
      }

      const campos = err.response?.data?.errors;
      if (campos) {
        const fieldMessages: Record<string, string> = {};
        Object.entries(campos).forEach(([campo, mensagens]) => {
          if (Array.isArray(mensagens) && mensagens.length > 0) {
            fieldMessages[campo] = traduzirMensagem(mensagens[0]);
          }
        });
        setFieldErrors(fieldMessages);
      }
    }
  };

  return {
    handleSubmit,
    handleFileChange,
  };
}
