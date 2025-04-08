// components/FeedbackModal.tsx
import { useEffect, useState } from 'react';
import './index.css';

interface FeedbackModalProps {
    message: string;
    onClose: () => void;
}

export default function FeedbackModal({ message, onClose }: FeedbackModalProps) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return show ? (
        <div className="modalFeedback">
            <div className="modalContent">
                <p>{message}</p>
            </div>
        </div>
    ) : null;
}
