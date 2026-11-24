import '../styles/TimeLine.scss';

const eventi = [
    {
        orario: '11:00',
        titolo: 'Inizio dell\'evento',
        descrizione: 'Siete invitati a presentarvi in location a questo orario.',
        icona: '🎞️'
    },
    {
        orario: '11:30',
        titolo: 'Inizio cerimonia',
        descrizione: 'Il momento più atteso della giornata. Il nostro amore sarà ufficialmente per sempre. ',
        icona: '💍'
    },
    {
        orario: '12:15',
        titolo: 'Aperitivo',
        descrizione: 'Un brindisi insieme per dare inizio ai festeggiamenti.',
        icona: '🥂'
    },
    {
        orario: '13:00',
        titolo: 'Pranzo',
        descrizione: 'Si comincia con il pranzo, tra buon cibo, sorrisi e momenti da condividere.',
        icona: '🍽️'
    }
];

function Timeline() {
    return (
        <section className="timeline-section">

            <div className="timeline-header">
                <span className="timeline-subtitle">THE WEDDING DAY</span>
                <h2>Il trailer ufficiale</h2>
                <p>Una giornata speciale, momento dopo momento.</p>
                <div className="timeline-divider"></div>
            </div>

            <div className="timeline">

                {eventi.map((evento, index) => (
                    <div className="timeline-item" key={index}>

                        <div className="timeline-marker">
                            <span>{evento.icona}</span>
                        </div>

                        <div className="timeline-card">

                            <span className="timeline-time">
                                {evento.orario}
                            </span>

                            <h3>{evento.titolo}</h3>

                            <p>{evento.descrizione}</p>

                        </div>

                    </div>
                ))}

            </div>

            <div className="timeline-footer">
                <span>AND THEY LIVED HAPPILY EVER AFTER</span>
            </div>

        </section>
    );
}

export default Timeline;
