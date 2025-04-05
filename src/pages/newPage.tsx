import './index.css';
import { useState, useEffect } from 'react';



export default function Newpage() {
    const [fileName, setFileName] = useState("Nenhum arquivo selecionado");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        }
    };

    return (
        <div className="WrapperDashboard">
            <div className="addPage">

                <label>Carregue sua primeira foto para a página</label>

                <label htmlFor="fileInput" className="customFileUpload">
                    <p style={{ marginTop: "8px", textAlign: "center" }}>{fileName}</p> <p>---Escolher imagem</p>
                </label>
                <input type="file" id="fileInput" onChange={handleFileChange} />


                <label>Carregue sua segunda foto para a página</label>

                <label htmlFor="fileInput" className="customFileUpload">
                    <p style={{ marginTop: "8px", textAlign: "center" }}>{fileName}</p> <p>---Escolher imagem</p>
                </label>
                <input type="file" id="fileInput" onChange={handleFileChange} />



                <label>Carregue sua terceira foto para a página</label>

                <label htmlFor="fileInput" className="customFileUpload">
                    <p style={{ marginTop: "8px", textAlign: "center" }}>{fileName}</p> <p>---Escolher imagem</p>
                </label>
                <input type="file" id="fileInput" onChange={handleFileChange} />




                <label>Digite a descrição para sua página</label>
                <input className='customInput' type="text" placeholder="O dia em começamos o nosso noivado ..." />

                <button >
                    Adicionar Página <img></img>
                </button>

            </div>
        </div>
    )
}