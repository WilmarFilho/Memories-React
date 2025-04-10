import QRCodeComponent from '../../services/qr';
import './index.css'

interface Props {
    userHash: string | undefined
}

export default function CardQr({userHash} : Props) {
    return (
        <div className="col-12 col-md-9 col-lg-5 content-qr">
            <h2>Compartilhe seu qr ou link com suas memórias</h2>
            <QRCodeComponent userHash={userHash} />
        </div>
    )
}