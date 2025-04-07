import QRCode from 'react-qr-code';

export default function QRCodeComponent({ userHash }: { userHash?: string }) {
    if (!userHash) return null;

    const finalUrl = `https://memories.celleta.com/pagina/${userHash}`;

    return (
        <>
            <QRCode value={finalUrl} className='QRCode'/>
            <p className='linkQRCode'>Link: <a href={finalUrl} target="_blank" rel="noopener noreferrer">{finalUrl}</a></p>
        </>
    );
}
