import upload from './upload.svg';

interface Props {
    index: number;
    images: (File | null | string)[];
    handleFileChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
    fieldErrors: Record<string, string>;
}

export default function InputImage({ index, images, handleFileChange, fieldErrors }: Props) {
    return (
        <div>
            <label>Carregue sua {index + 1}ª foto para a página</label>
            <label htmlFor={`fileInput-${index}`} className="customFileUpload">
                <p>{images[index] ? 'Imagem carregada' : 'png | jpeg'}</p>
                <img src={upload} alt="Ícone de upload" />
            </label>
            <input
                type="file"
                id={`fileInput-${index}`}
                onChange={(e) => handleFileChange(index, e)}
                accept="image/*"
                style={{ display: 'none' }}
            />
            {fieldErrors[`img_0${index + 1}`] && (
                <p style={{ color: 'red' }}>{fieldErrors[`img_0${index + 1}`]}</p>
            )}
        </div>
    );
}
