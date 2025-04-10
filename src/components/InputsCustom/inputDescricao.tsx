import './index.css'

interface Props {
    descricao: string;
    setDescricao: (value: string) => void;
    fieldErrors: Record<string, string>;
}

const MAX_LENGTH = 200;

export default function InputDescricao({ descricao, setDescricao, fieldErrors }: Props) {
    return (
        <div>
            <label>Digite a descrição para sua página</label>
            <textarea
                className='customInput'
                placeholder="O dia em que começamos o nosso noivado..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                maxLength={MAX_LENGTH}
            />
            <div style={{ fontSize: '12px', color: descricao.length >= MAX_LENGTH ? 'red' : '#666' }}>
                {MAX_LENGTH - descricao.length} caracteres restantes
            </div>
            {fieldErrors['descricao'] && (
                <p style={{ color: 'red' }}>{fieldErrors['descricao']}</p>
            )}
        </div>
    );
}
