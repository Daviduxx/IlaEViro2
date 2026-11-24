import '../styles/MovieTicket.scss';
import LocationButton from './LocationButton';

function MovieTicket() {
    return (
        <div className="ticketCntainer">

            <div className="movie-ticket">

                <div className="ticket-main">
                    <span className="ticket-label">L'EVENTO SI TERRÀ PRESSO</span>

                    <h2>LA VIÀ</h2>

                    <p className="ticket-couple">
                        Cavour (TO)
                    </p>

                    <p className="ticket-description">
                        via Rimembranza 9
                    </p>

                    <div className="ticket-divider">
                        <span>✦</span>
                    </div>
                </div>

                <div className="ticket-stub">
                    <span className="stub-label">il 24 Aprile 2027</span>

                    <span className="stub-bottom">Alle ore <br></br> 11:00</span>

                    <div className="ticket-icon">✦</div>
                </div>

            </div>
            <LocationButton />
        </div>
    );
}

export default MovieTicket;