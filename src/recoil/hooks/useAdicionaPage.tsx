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
    fieldErrorsState
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
        if (selectedFiles && selectedFiles[0]) {
            const newImages = [...images];
            const newFiles = [...files];
            newImages[index] = URL.createObjectURL(selectedFiles[0]);
            newFiles[index] = selectedFiles[0];
            setImages(newImages);
            setFiles(newFiles);
            e.target.value = '';
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('descricao', descricao);

        if (files[0]) formData.append('img_01', files[0]);
        if (files[1]) formData.append('img_02', files[1]);
        if (files[2]) formData.append('img_03', files[2]);

        try {
            if (pageId) {
                const response = await api.post(`/page/${pageId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                navigate("/dashboard", { state: { feedback: "editado" } });
            } else {
                const response = await api.post('/page/novo', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                navigate("/dashboard", { state: { feedback: "criado" } });
            }
        } catch (err: any) {
            window.scrollTo(0, 0);
            if (err.response?.data?.message) {
                setErro(err.response.data.message);
            }
            const campos = err.response?.data?.errors;
            const fieldMessages: { [key: string]: string } = {};
            if (campos) {
                Object.keys(campos).forEach((campo) => {
                    if (Array.isArray(campos[campo])) {
                        fieldMessages[campo] = traduzirMensagem(campos[campo][0]);
                    }
                });
            }
            setFieldErrors(fieldMessages);
        }
    };

    return {
        handleSubmit,
        handleFileChange
    }

}