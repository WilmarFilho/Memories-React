import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

// Estado global
import {
    imagesState,
    filesState,
    descricaoState,
    fieldErrorsState
} from '../recoil/atoms';

// Hooks
import useEditaOuAdiciona from '../recoil/hooks/useEditaOuAdiciona';
import useAdicionaPage from '../recoil/hooks/useAdicionaPage';

// Componentes
import ButtonMain from '../components/Buttons';
import InputImage from '../components/InputsCustom/inputImage';
import InputDescricao from '../components/InputsCustom/inputDescricao';

// Estilos
import './assets/index.css';

export default function Newpage() {
    const { pageId } = useParams<{ userHash: string; pageId: string }>();

    const [images, setImages] = useRecoilState(imagesState);
    const [files, setFiles] = useRecoilState(filesState);
    const [descricao, setDescricao] = useRecoilState(descricaoState);
    const [fieldErrors] = useRecoilState(fieldErrorsState);

    useEditaOuAdiciona()

    const { handleFileChange, handleSubmit } = useAdicionaPage();

    const removeImage = (index : number) => {
        const updatedImages = [...images];
        const updatedFiles = [...files];
        updatedImages[index] = null;
        updatedFiles[index] = null;
        setImages(updatedImages);
        setFiles(updatedFiles);
    }

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
                                    onClick={() => removeImage(index)}
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
