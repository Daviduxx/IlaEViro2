import '../styles/MovieTicket.scss';
import LocationButton from './LocationButton';

function MovieTicket() {
    return (
        <div className="ticketCntainer">

            <div className="movie-ticket">

                <div className="ticket-main">
                    <span className="ticket-label">L'EVENTO SI TERRÀ PRESSO</span>

                    <h2>CASTELLO PIPPO</h2>

                    <p className="ticket-couple">
                        La Loggia (TO)
                    </p>

                    <p className="ticket-description">
                        via Paperino 10
                    </p>

                    <div className="ticket-divider">
                        <span>✦</span>
                    </div>
                </div>

                <div className="ticket-stub">
                    <span className="stub-label">il 24 Aprile 2026</span>

                    <span className="stub-bottom">Alle ore <br></br> 12:00</span>

                    <div className="ticket-icon">✦</div>
                </div>

            </div>
            <LocationButton />
        </div>
    );
}

export default MovieTicket;