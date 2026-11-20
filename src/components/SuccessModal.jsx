import '../styles/SuccessModal.scss';

function SuccessModal({ onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="success-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <img src="/movie-ticket.png" alt="" />

                <span className="modal-decoration">✦</span>

                <h2>Grazie!</h2>

                <p>
                    La tua risposta è stata registrata correttamente.
                </p>

                <p className="modal-subtitle">
                    Non vediamo l'ora di festeggiare con te!
                </p>

                <button onClick={onClose}>
                    PERFETTO!
                </button>
            </div>
        </div>
    );
}

export default SuccessModal;