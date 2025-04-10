import { useEffect, useState } from 'react';
import './index.css';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    
    const consentGiven = localStorage.getItem('cookieConsent');
    
    if (!consentGiven) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false); // desaparece em 10 segundos (visual)
      }, 8000); // 10s

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent">
      <p>
        Utilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa
        <a href="/politica-de-privacidade" target="_blank"> Política de Privacidade</a>.
      </p>
      <button onClick={handleAccept}>Aceitar</button>
    </div>
  );
}
