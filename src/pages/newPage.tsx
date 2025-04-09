import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import upload from './assets/upload.svg';

import addMain from './assets/addMainPage.svg';
import './index.css';

import api from '../services/api';

import Page from '../types/page';


export default function Newpage() {

    const navigate = useNavigate();

    const { userHash, pageId } = useParams<{ userHash: string; pageId: string }>();
    const [images, setImages] = useState<(string | null)[]>([null, null, null]);
    const [files, setFiles] = useState<(File | null)[]>([null, null, null]);
    const [descricao, setDescricao] = useState('');
    const [error, setErro] = useState('')
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (userHash && pageId) {
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
                }
            });
        }

    }, [userHash, pageId]);

    const MAX_LENGTH = 200;

    function traduzirMensagem(mensagem: string): string {
        const traducoes: { [key: string]: string } = {
            "The img 01 field must not be greater than 2048 kilobytes.": "A imagem 1 não pode ter mais de 2MB.",
            "The img 02 field must not be greater than 2048 kilobytes.": "A imagem 2 não pode ter mais de 2MB.",
            "The img 03 field must not be greater than 2048 kilobytes.": "A imagem 3 não pode ter mais de 2MB.",
            "The descricao field must be at least 15 characters.": "A descrição deve ter pelo menos 15 caracteres.",
            "The img 01 field must be an image.": "A imagem 1 precisa ser uma imagem",
            "The img 02 field must be an image.": "A imagem 2 precisa ser uma imagem",
            "The img 03 field must be an image.": "A imagem 3 precisa ser uma imagem",
            "The img 01 field must be a file of type: jpeg, png, jpg, gif.": "A imagem precisar ser um png, jpeg, jpg ou gif",
            "The img 02 field must be a file of type: jpeg, png, jpg, gif.": "A imagem precisar ser um png, jpeg, jpg ou gif",
            "The img 03 field must be a file of type: jpeg, png, jpg, gif.": "A imagem precisar ser um png, jpeg, jpg ou gif",
            "The descricao field must not be greater than 200 characters.": "A descrição não deve ter mais de 200 caracteres.",
            "The descricao field is required.": "A descrição é obrigatória.",
            "The img 01 field is required.": "A imagem 1 é obrigatória.",
            "The img 02 field is required.": "A imagem 2 é obrigatória.",
            "The img 03 field is required.": "A imagem 3 é obrigatória.",
        }
        return traducoes[mensagem] || mensagem;
    }

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

        // Apenas adiciona os arquivos que foram alterados
        if (files[0]) formData.append('img_01', files[0]);
        if (files[1]) formData.append('img_02', files[1]);
        if (files[2]) formData.append('img_03', files[2]);

        try {
            if (pageId) {
                // Edição
                const response = await api.post(`/page/${pageId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log("Página editada com sucesso:", response.data);
                navigate("/dashboard", {
                    state: {
                        feedback: "editado",
                    },
                });
            } else {
                // Novo


                const response = await api.post('/page/novo', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log("Página adicionada com sucesso:", response.data);
                navigate("/dashboard", {
                    state: {
                        feedback: "criado",
                    },
                });
            }
        } catch (err: any) {
            window.scrollTo(0, 0);
            console.error("Erro ao enviar a página:", err);

            // Erro geral
            if (err.response?.data?.message) {
                setErro(err.response.data.message);
            }

            // Erros de campos específicos
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
                    <div key={i}>
                        <label>Carregue sua {i + 1}ª foto para a página</label>

                        <label htmlFor={`fileInput-${i}`} className="customFileUpload">
                            <p style={{ marginTop: "8px", textAlign: "start" }}>{images[i] ? 'Imagem carregada' : 'png | jpeg'}</p>
                            <img src={upload} />
                        </label>

                        <input
                            type="file"
                            id={`fileInput-${i}`}
                            onChange={(e) => handleFileChange(i, e)}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />

                        {/* Feedback de erro da imagem */}
                        {fieldErrors[`img_0${i + 1}`] && (
                            <p style={{ color: 'red', marginTop: '4px' }}>{fieldErrors[`img_0${i + 1}`]}</p>
                        )}
                    </div>
                ))}

                <div>
                    <label>Digite a descrição para sua página</label>
                    <textarea
                        className='customInput'
                        placeholder="O dia em que começamos o nosso noivado..."
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                    <div style={{ fontSize: '12px', color: descricao.length >= MAX_LENGTH ? 'red' : '#666', marginTop: '4px' }}>
                        {MAX_LENGTH - descricao.length} caracteres restantes
                    </div>
                    {fieldErrors[`descricao`] && (
                        <p style={{ color: 'red', marginTop: '4px' }}>{fieldErrors[`descricao`]}</p>
                    )}
                </div>



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

                <button onClick={handleSubmit}>
                    {pageId ? 'Salvar Alterações' : 'Adicionar Página'}
                    <img className='addMainSvg' src={addMain} />
                </button>
            </div>
        </div>
    );
}
