import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import {
    imagesState,
    filesState,
    descricaoState,
    errorState,
    fieldErrorsState
} from '../recoil/atoms';

import './assets/index.css';

import api from '../services/api';
import Page from '../types/page';
import ButtonMain from '../components/Buttons';
import InputImage from '../components/InputsCustom/inputImage';
import InputDescricao from '../components/InputsCustom/inputDescricao';
import traduzirMensagem from '../utils/tradutor';

export default function Newpage() {
    
    const navigate = useNavigate();
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

    return (
        <div className="WrapperDashboard">
            <div className="addPage">
                {[0, 1, 2].map((i) => (
                    <InputImage key={i} index={i} fieldErrors={fieldErrors} images={images} handleFileChange={handleFileChange} />
                ))}

                <InputDescricao descricao={descricao} setDescricao={setDescricao} fieldErrors={fieldErrors} />

                <div className="previewImages">
                    {images.map((img, index) => (
                        img && (
                            <div key={index} className="imagePreviewWrapper">
                                <img className="imagePreview" src={img} alt={`Preview ${index + 1}`} />
                                <button
                                    type="button"
                                    className="removeImageBtn"
                                    onClick={() => {
                                        const updatedImages = [...images];
                                        const updatedFiles = [...files];
                                        updatedImages[index] = null;
                                        updatedFiles[index] = null;
                                        setImages(updatedImages);
                                        setFiles(updatedFiles);
                                    }}
                                >
                                    ✖
                                </button>
                            </div>
                        )
                    ))}
                </div>

                <ButtonMain onClick={handleSubmit} pageId={pageId} />

            </div>
        </div>
    );
}
