
import { useState } from 'react';
import '../styles/ThankYou.scss';

function ThankYou() {
    const [copied, setCopied] = useState(false);
    const iban = 'IT50 K030 6930 5511 0000 0006 137'
    const copyIban = async () => {
        try {
            await navigator.clipboard.writeText(iban);
            setCopied(true);
        } catch (error) {
            console.error('Impossibile copiare l’IBAN:', error);
        }
    };

    return (
        <section className="thankyou-section">

            <div className="thankyou-content">

                <span className="thankyou-eyebrow">
                    WITH LOVE & GRATITUDE
                </span>

                <h2>Il regalo più grande è avervi con noi</h2>

                <div className="thankyou-divider">✦</div>

                <p className="thankyou-message">
                    Presto partiremo per un'altra avventura: un incredibile road trip alla scoperta dell'Irlanda!
                    Se ci conoscete sapete bene quanto siamo legati a questa terrae cosa significa per noi, perciò vi lasciamo qualche informazione se
                    vorreste contribuire a questo viaggio.
                </p>

                <div className="gift-card">

                    <span className="gift-card-label">
                        NEXT CHAPTER: IRELAND
                    </span>



                    <div className="gift-details">

                        <span>INTESTATARIO</span>
                        <p>Ilaria Andrea Azimonti</p>

                        <span>IBAN</span>
                        <p className="gift-iban">IT50 K030 6930 5511 0000 0006 137</p>

                    </div>

                    <button
                        className="gift-copy-button"
                        onClick={copyIban}
                        type="button"
                    >
                        {copied ? '✓ IBAN COPIATO' : '✦ COPIA IBAN ✦'}
                    </button>

                </div>

                <p className="thankyou-footer">
                    Con affetto, Ilaria & Giulio
                </p>

            </div>

        </section>
    );
}

export default ThankYou;
