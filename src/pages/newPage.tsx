import './index.css';
import { useState } from 'react';
import upload from './assets/upload.svg';
import addMain from './assets/addMainPage.svg'

export default function Newpage() {
    const [images, setImages] = useState<(string | null)[]>([null, null, null]);

    const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            const newImages = [...images];
            newImages[index] = URL.createObjectURL(files[0]); // cria uma URL temporária da imagem
            setImages(newImages);
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
                    </div>
                ))}

                <div>
                    <label>Digite a descrição para sua página</label>
                    <input className='customInput' type="text" placeholder="O dia em que começamos o nosso noivado..." />
                </div>
                <div className="previewImages">

                    {images.map((img, index) => (
                        img && <img className="imagePreview" key={index} src={img} alt={`Preview ${index + 1}`} />
                    ))}

                </div>
                <button>Adicionar Página  <img className='addMainSvg' src={addMain} /> </button>



            </div>



        </div>
    );
}
